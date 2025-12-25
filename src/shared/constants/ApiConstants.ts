import { AppConfig } from './AppConfig';

/**
 * API 관련 상수
 */
export class ApiConstants {
  // 개발 환경과 프로덕션 모두 백엔드 서버 직접 사용
  public static readonly API_SERVER_BASE_URL = 'https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app';
  
  public static readonly PARKING_LOTS_API_PATH = '/api/v1/parking-lots';
  public static readonly SEOUL_CENTER_LATITUDE = 37.5665;
  public static readonly SEOUL_CENTER_LONGITUDE = 126.978;
  public static readonly KAKAO_MAP_API_KEY = AppConfig.KAKAO_MAP_API_KEY;
}

