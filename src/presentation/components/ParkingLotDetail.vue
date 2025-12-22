<template>
  <div v-if="parkingLot" class="parking-lot-detail">
    <h2>{{ parkingLot.name }}</h2>
    <div class="detail-info">
      <p><strong>주소:</strong> {{ parkingLot.address }}</p>
      <p v-if="parkingLot.capacity">
        <strong>수용 대수:</strong> {{ parkingLot.capacity }}대
      </p>
      <p v-if="parkingLot.operatingHours">
        <strong>운영 시간:</strong> {{ parkingLot.operatingHours }}
      </p>
    </div>
    <button @click="close">닫기</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';

/**
 * 주차장 상세 컴포넌트 Props
 */
const props = defineProps<{
  parkingLot: ParkingLot | null;
}>();

/**
 * 주차장 상세 컴포넌트 Emits
 */
const emit = defineEmits<{
  close: [];
}>();

/**
 * 상세 정보를 닫는다
 */
const close = () => {
  emit('close');
};
</script>

<style scoped>
.parking-lot-detail {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.detail-info {
  margin-bottom: 1.5rem;
}

.detail-info p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}
</style>

