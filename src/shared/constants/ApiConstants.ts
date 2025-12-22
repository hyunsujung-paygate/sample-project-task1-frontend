/**
 * API 관련 상수
 */
export class ApiConstants {
  public static readonly SEOUL_OPEN_API_BASE_URL = 'https://data.seoul.go.kr';
  public static readonly SEOUL_SERVICE_NAME = 'TbPublicWifiInfo';
  public static readonly SEOUL_SERVICE_ID = '1';
  public static readonly KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY || '';
}

