<template>
  <div class="map-wrapper">
    <div class="search-container">
      <div class="search-form">
        <div class="search-field">
          <label for="district">구</label>
          <input
            id="district"
            v-model="searchParams.district"
            type="text"
            placeholder="예: 강남구"
            @keyup.enter="search"
          />
        </div>
        <div class="search-field">
          <label for="dong">동</label>
          <input
            id="dong"
            v-model="searchParams.dong"
            type="text"
            placeholder="예: 역삼동"
            @keyup.enter="search"
          />
        </div>
        <button class="search-button" @click="search" :disabled="isLoading">
          {{ isLoading ? '검색 중...' : '검색' }}
        </button>
        <button class="reset-button" @click="reset" :disabled="isLoading">
          초기화
        </button>
      </div>
    </div>
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DisplayMapMarkersUseCase } from '@/application/usecase/DisplayMapMarkersUseCase';
import { ParkingLotRepositoryImpl } from '@/infrastructure/repository/ParkingLotRepositoryImpl';
import { MapServiceImpl } from '@/domain/Map/MapServiceImpl';
import { ParkingLotSearchParams } from '@/domain/ParkingLot/ParkingLotRepository';

/**
 * 지도 뷰 컴포넌트
 */
const parkingLotRepository = new ParkingLotRepositoryImpl();
const mapService = new MapServiceImpl();
const displayMapMarkersUseCase = new DisplayMapMarkersUseCase(
  parkingLotRepository,
  mapService
);

const isLoading = ref<boolean>(false);
const searchParams = ref<ParkingLotSearchParams>({
  district: '',
  dong: '',
});

/**
 * 주차장을 검색한다
 */
const search = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const params: ParkingLotSearchParams = {};
    if (searchParams.value.district?.trim()) {
      params.district = searchParams.value.district.trim();
    }
    if (searchParams.value.dong?.trim()) {
      params.dong = searchParams.value.dong.trim();
    }

    // 마커 초기화
    mapService.clearMarkers();

    // 검색 실행 (지도 초기화 건너뛰기 - 이미 초기화되어 있음)
    // 검색 결과가 있으면 해당 위치로 지도가 자동으로 이동됨 (displayMarkers에서 setBounds 호출)
    await displayMapMarkersUseCase.execute(
      Object.keys(params).length > 0 ? params : undefined,
      true // skipInitialization: true
    );
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    alert('검색 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};

/**
 * 검색 조건을 초기화한다
 */
const reset = async (): Promise<void> => {
  searchParams.value = {
    district: '',
    dong: '',
  };
  isLoading.value = true;
  try {
    mapService.clearMarkers();
    await displayMapMarkersUseCase.execute();
  } catch (error) {
    console.error('초기화 중 오류 발생:', error);
    alert('초기화 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};

/**
 * 지도 이동 시 현재 보이는 영역의 주차장을 다시 로드한다
 */
const loadParkingLotsOnMapMove = async (): Promise<void> => {
  if (isLoading.value) {
    return; // 이미 로딩 중이면 무시
  }

  // 검색 조건이 있으면 검색 조건 유지, 없으면 전체 조회
  const params: ParkingLotSearchParams = {};
  if (searchParams.value.district?.trim()) {
    params.district = searchParams.value.district.trim();
  }
  if (searchParams.value.dong?.trim()) {
    params.dong = searchParams.value.dong.trim();
  }

  try {
    // 마커만 업데이트 (지도는 이미 초기화되어 있음)
    const parkingLots = Object.keys(params).length > 0
      ? await parkingLotRepository.findBySearchParams(params)
      : await parkingLotRepository.findAll();
    
    // 현재 지도 영역 내의 주차장만 필터링
    const kakao = (window as any).kakao;
    if (kakao && kakao.maps && mapService) {
      const map = (mapService as any).getMap?.() || (mapService as any).map;
      if (map) {
        const bounds = map.getBounds();
        if (bounds) {
          const sw = bounds.getSouthWest(); // 남서쪽 좌표
          const ne = bounds.getNorthEast(); // 북동쪽 좌표
          
          const filteredParkingLots = parkingLots.filter((lot) => {
            return (
              lot.latitude >= sw.getLat() &&
              lot.latitude <= ne.getLat() &&
              lot.longitude >= sw.getLng() &&
              lot.longitude <= ne.getLng()
            );
          });
          
          mapService.displayMarkers(filteredParkingLots);
          return;
        }
      }
    }
    
    // bounds를 가져올 수 없으면 전체 표시
    mapService.displayMarkers(parkingLots);
  } catch (error) {
    console.error('지도 이동 시 주차장 로드 오류:', error);
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    // 카카오맵 API 로드 확인
    const { KakaoMapLoader } = await import('@/shared/utils/KakaoMapLoader');
    if (!KakaoMapLoader.isLoaded()) {
      console.log('카카오맵 API 로드 중...');
      await KakaoMapLoader.load();
    }
    
    // 초기 주차장 로드
    await displayMapMarkersUseCase.execute();
    
    // 지도 이동 이벤트 리스너 등록
    mapService.onBoundsChanged(() => {
      loadParkingLotsOnMapMove();
    });
  } catch (error) {
    console.error('지도 초기화 중 오류 발생:', error);
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    alert(`지도 초기화 중 오류가 발생했습니다: ${errorMessage}`);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.search-container {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.search-form {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.search-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.search-field input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
  min-width: 150px;
}

.search-field input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button,
.reset-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button {
  background-color: #007bff;
  color: white;
}

.search-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.reset-button {
  background-color: #6c757d;
  color: white;
}

.reset-button:hover:not(:disabled) {
  background-color: #545b62;
}

.search-button:disabled,
.reset-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.map-container {
  width: 100%;
  flex: 1;
  min-height: 0;
}
</style>

