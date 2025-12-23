import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './presentation/App.vue';
import router from './presentation/router';
import { KakaoMapLoader } from './shared/utils/KakaoMapLoader';

/**
 * 애플리케이션 진입점
 */
async function initApp() {
  try {
    await KakaoMapLoader.load();
    console.log('카카오맵 API 로드 완료');
  } catch (error) {
    console.error('카카오맵 API 로드 실패:', error);
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류';
    alert(`카카오맵 API를 로드할 수 없습니다: ${errorMessage}`);
  }

  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount('#app');
}

initApp();

