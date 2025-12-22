<template>
  <div class="home-view">
    <h1>서울시 공영주차장 안내</h1>
    <MapView />
  </div>
</template>

<script setup lang="ts">
import MapView from '../components/MapView.vue';

/**
 * 홈 뷰 컴포넌트
 */
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  padding: 1rem;
  text-align: center;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
</style>

