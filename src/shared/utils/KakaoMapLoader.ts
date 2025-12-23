import { ApiConstants } from '../constants/ApiConstants';

/**
 * 카카오맵 API 로더 유틸리티
 */
export class KakaoMapLoader {
  private static loaded = false;

  /**
   * 카카오맵 API가 로드되었는지 확인한다
   *
   * @returns 로드 여부
   */
  public static isLoaded(): boolean {
    return this.loaded && !!(window as any).kakao?.maps;
  }

  /**
   * 카카오맵 API를 로드한다
   *
   * @returns Promise<void>
   */
  public static async load(): Promise<void> {
    if (this.loaded && this.isLoaded()) {
      console.log('카카오맵 API 이미 로드됨');
      return;
    }

    const apiKey = ApiConstants.KAKAO_MAP_API_KEY;
    if (!apiKey) {
      throw new Error('카카오맵 API 키가 설정되지 않았습니다. AppConfig.ts 파일을 확인해주세요.');
    }

    // 이미 스크립트가 로드되어 있는지 확인
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    ) as HTMLScriptElement;

    if (existingScript) {
      console.log('기존 스크립트 태그 발견, 로드 대기 중...');
      // 기존 스크립트가 있는 경우 로드 대기
      return this.waitForKakaoMaps();
    }

    // 스크립트 동적 로드
    console.log('카카오맵 스크립트 동적 로드 시작...');
    const scriptUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.async = false; // 동기 로드로 변경하여 순서 보장
      script.defer = false;
      // crossOrigin 제거 (카카오맵 API는 CORS 정책이 다를 수 있음)

      script.onload = () => {
        console.log('카카오맵 스크립트 로드 성공');
        // 스크립트 로드 후 kakao 객체가 생성될 때까지 폴링으로 확인
        let attempts = 0;
        const maxAttempts = 50; // 5초 대기
        
        const checkKakao = setInterval(() => {
          attempts++;
          const kakao = (window as any).kakao;
          
          if (kakao && kakao.maps) {
            clearInterval(checkKakao);
            console.log('카카오맵 객체 확인됨, 초기화 시작...');
            this.waitForKakaoMaps()
              .then(() => resolve())
              .catch((error) => reject(error));
          } else if (attempts >= maxAttempts) {
            clearInterval(checkKakao);
            console.error('카카오맵 객체를 찾을 수 없습니다');
            console.error('window.kakao:', (window as any).kakao);
            console.error('스크립트 URL:', scriptUrl);
            reject(new Error('카카오맵 객체를 찾을 수 없습니다. API 키와 도메인 등록을 확인해주세요.'));
          } else if (attempts % 10 === 0) {
            console.log(`카카오 객체 대기 중... (${attempts * 0.1}초)`);
          }
        }, 100);
      };

      script.onerror = (event) => {
        console.error('카카오맵 스크립트 로드 실패:', event);
        console.error('스크립트 URL:', scriptUrl);
        console.error('스크립트 태그:', script);
        
        // 스크립트 태그 제거
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        
        // 네트워크 상태 확인을 위한 추가 정보
        const errorDetails = {
          url: scriptUrl,
          apiKey: apiKey.substring(0, 8) + '...',
          userAgent: navigator.userAgent,
          location: window.location.href,
          origin: window.location.origin,
          hostname: window.location.hostname
        };
        console.error('오류 상세 정보:', errorDetails);
        
        // fetch를 사용하여 상태 코드 확인
        fetch(scriptUrl, { method: 'HEAD', mode: 'no-cors' })
          .then(() => {
            console.log('fetch HEAD 요청 성공 (상태 코드 확인 불가)');
          })
          .catch((fetchError) => {
            console.error('fetch HEAD 요청 실패:', fetchError);
          });
        
        // 상태 코드별 오류 메시지
        const getErrorMessage = (statusCode?: number) => {
          if (statusCode === 401) {
            return `401 Unauthorized 오류

이 오류는 다음 중 하나의 문제일 수 있습니다:

1. ⚠️ 도메인 미등록 (가장 흔한 원인)
   현재 도메인: ${window.location.origin}
   
   해결 방법:
   - 카카오 개발자 콘솔(https://developers.kakao.com/) 접속
   - 내 애플리케이션 선택
   - 앱 설정 > 플랫폼 > Web 플랫폼 등록
   - 사이트 도메인에 "${window.location.origin}" 정확히 입력
     (프로토콜 포함, 마지막 / 없이)
   - 저장 후 10분 정도 대기

2. ⚠️ API 키 오류
   현재 사용 중인 키: ${apiKey.substring(0, 8)}...
   
   해결 방법:
   - 카카오 개발자 콘솔 > 앱 키 메뉴에서 JavaScript 키 확인
   - AppConfig.ts 파일의 KAKAO_MAP_API_KEY 값과 일치하는지 확인
   - 키가 다르면 AppConfig.ts 파일 수정

3. ⚠️ 카카오맵 API 미활성화
   해결 방법:
   - 카카오 개발자 콘솔 > 제품 설정 > 카카오맵 API 활성화 확인

4. ⚠️ 애플리케이션 상태
   해결 방법:
   - 카카오 개발자 콘솔 > 앱 설정 > 일반
   - 앱 상태가 "서비스 중"인지 확인

상세 가이드: Docs/카카오맵_API_설정_가이드.md 파일 참조`;
          } else if (statusCode === 403) {
            return `403 Forbidden 오류

도메인이 등록되지 않았거나 API 키가 잘못되었습니다.
위의 401 오류 해결 방법을 참조하세요.`;
          } else {
            return `카카오맵 스크립트 로드 실패 (상태 코드: ${statusCode || '알 수 없음'})

가능한 원인:
1. 도메인 미등록: ${window.location.origin}
2. API 키 오류: ${apiKey.substring(0, 8)}...
3. 네트워크 문제

브라우저 개발자 도구(F12) > 네트워크 탭에서 상태 코드를 확인하세요.
상세 가이드: Docs/카카오맵_API_설정_가이드.md`;
          }
        };
        
        // 실제 상태 코드를 확인하기 위해 fetch 시도
        fetch(scriptUrl)
          .then((response) => {
            const statusCode = response.status;
            console.error(`HTTP 상태 코드: ${statusCode}`);
            reject(new Error(getErrorMessage(statusCode)));
          })
          .catch(() => {
            // fetch 실패 시 일반 오류 메시지
            reject(new Error(getErrorMessage()));
          });
      };

      document.head.appendChild(script);
      console.log('카카오맵 스크립트 태그 추가됨:', scriptUrl);
    });
  }

  /**
   * 카카오맵 API 객체가 로드될 때까지 대기한다
   *
   * @returns Promise<void>
   */
  private static waitForKakaoMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      const kakao = (window as any).kakao;
      
      if (!kakao || !kakao.maps) {
        reject(new Error('카카오맵 객체를 찾을 수 없습니다.'));
        return;
      }

      // readyState 확인
      if (kakao.maps.readyState === 2) {
        // 이미 로드 완료
        console.log('카카오맵 API 이미 로드 완료 상태');
        this.loaded = true;
        resolve();
        return;
      }

      console.log('카카오맵 maps 객체 발견, load() 호출...');
      console.log('현재 readyState:', kakao.maps.readyState);

      try {
        // kakao.maps.load() 호출
        kakao.maps.load(() => {
          console.log('카카오맵 API 초기화 완료');
          this.loaded = true;
          resolve();
        });

        // 타임아웃 설정 (10초)
        setTimeout(() => {
          if (!this.loaded) {
            console.error('카카오맵 API 초기화 타임아웃');
            console.error('readyState:', kakao.maps.readyState);
            reject(new Error('카카오맵 API 초기화 타임아웃 (10초)'));
          }
        }, 10000);
      } catch (error) {
        console.error('카카오맵 초기화 중 오류:', error);
        reject(new Error(`카카오맵 초기화 실패: ${error}`));
      }
    });
  }
}

