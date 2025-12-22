import { ApiConstants } from '../constants/ApiConstants';

/**
 * 카카오맵 API 로더 유틸리티
 */
export class KakaoMapLoader {
  private static loaded = false;

  /**
   * 카카오맵 API를 로드한다
   *
   * @returns Promise<void>
   */
  public static async load(): Promise<void> {
    if (this.loaded) {
      return;
    }

    const apiKey = ApiConstants.KAKAO_MAP_API_KEY;
    if (!apiKey) {
      throw new Error('카카오맵 API 키가 설정되지 않았습니다.');
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        const kakao = (window as any).kakao;
        if (kakao && kakao.maps) {
          kakao.maps.load(() => {
            this.loaded = true;
            resolve();
          });
        } else {
          reject(new Error('카카오맵 API 로드 실패'));
        }
      };
      script.onerror = () => {
        reject(new Error('카카오맵 API 스크립트 로드 실패'));
      };
      document.head.appendChild(script);
    });
  }
}

