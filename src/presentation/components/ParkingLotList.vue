<template>
  <div class="parking-lot-list">
    <h2>주차장 목록</h2>
    <ul v-if="parkingLots.length > 0">
      <li v-for="lot in parkingLots" :key="lot.id" @click="selectParkingLot(lot)">
        <h3>{{ lot.name }}</h3>
        <p>{{ lot.address }}</p>
      </li>
    </ul>
    <p v-else>주차장 정보가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';
import { GetParkingLotsUseCase } from '@/application/usecase/GetParkingLotsUseCase';
import { ParkingLotRepositoryImpl } from '@/infrastructure/repository/ParkingLotRepositoryImpl';

/**
 * 주차장 목록 컴포넌트
 */
const parkingLots = ref<ParkingLot[]>([]);
const getParkingLotsUseCase = new GetParkingLotsUseCase(
  new ParkingLotRepositoryImpl()
);

/**
 * 주차장 목록을 조회한다
 */
const loadParkingLots = async () => {
  parkingLots.value = await getParkingLotsUseCase.execute();
};

/**
 * 주차장을 선택한다
 *
 * @param lot 선택된 주차장
 */
const selectParkingLot = (lot: ParkingLot) => {
  // 주차장 선택 로직 구현
  console.log('선택된 주차장:', lot);
};

loadParkingLots();
</script>

<style scoped>
.parking-lot-list {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

li:hover {
  background-color: #f5f5f5;
}

h3 {
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}
</style>

