<template>
  <div id="map" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { DisplayMapMarkersUseCase } from '@/application/usecase/DisplayMapMarkersUseCase';
import { ParkingLotRepositoryImpl } from '@/infrastructure/repository/ParkingLotRepositoryImpl';
import { MapServiceImpl } from '@/domain/Map/MapServiceImpl';

/**
 * 지도 뷰 컴포넌트
 */
const parkingLotRepository = new ParkingLotRepositoryImpl();
const mapService = new MapServiceImpl();
const displayMapMarkersUseCase = new DisplayMapMarkersUseCase(
  parkingLotRepository,
  mapService
);

onMounted(async () => {
  await displayMapMarkersUseCase.execute();
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>

