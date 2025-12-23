import { AppConfig } from './AppConfig';

/**
 * API 관련 상수
 */
export class ApiConstants {
  // 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 API 서버 사용
  public static readonly API_SERVER_BASE_URL = import.meta.env.DEV
    ? '' // 개발 환경: Vite 프록시 사용 (상대 경로)
    : 'https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app'; // 프로덕션: 직접 API 서버 사용
  
  public static readonly PARKING_LOTS_API_PATH = '/api/v1/parking-lots';
  public static readonly SEOUL_CENTER_LATITUDE = 37.5665;
  public static readonly SEOUL_CENTER_LONGITUDE = 126.978;
  public static readonly KAKAO_MAP_API_KEY = AppConfig.KAKAO_MAP_API_KEY;
}

