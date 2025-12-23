import { ApiConstants } from '@/shared/constants/ApiConstants';
import { ParkingLotDto } from '@/application/dto/ParkingLotDto';

/**
 * 주차장 검색 파라미터
 */
export interface ParkingLotSearchParams {
  district?: string;
  dong?: string;
  name?: string;
  address?: string;
  type?: string;
}

/**
 * API 응답 구조 (유연한 타입)
 */
type ApiResponse = 
  | ParkingLotDto[] // 직접 배열 반환
  | {
      success: boolean;
      message?: string;
      data: ParkingLotDto[];
      timestamp?: string;
    }
  | {
      success?: boolean;
      message?: string;
      data?: ParkingLotDto[];
      [key: string]: any; // 기타 필드 허용
    };

/**
 * 서울시 공영주차장 API 클라이언트
 */
export class SeoulOpenApiClient {
  /**
   * 서울시 공영주차장 정보를 조회한다
   *
   * @param searchParams 검색 파라미터
   * @returns 주차장 정보 목록
   */
  public async getParkingLots(
    searchParams?: ParkingLotSearchParams
  ): Promise<ParkingLotDto[]> {
    // 개발 환경에서는 프록시 사용 (상대 경로), 프로덕션에서는 절대 경로
    const baseUrl = ApiConstants.API_SERVER_BASE_URL || window.location.origin;
    const url = new URL(
      `${baseUrl}${ApiConstants.PARKING_LOTS_API_PATH}`
    );

    if (searchParams) {
      if (searchParams.district) {
        url.searchParams.append('district', searchParams.district);
      }
      if (searchParams.dong) {
        url.searchParams.append('dong', searchParams.dong);
      }
      if (searchParams.name) {
        url.searchParams.append('name', searchParams.name);
      }
      if (searchParams.address) {
        url.searchParams.append('address', searchParams.address);
      }
      if (searchParams.type) {
        url.searchParams.append('type', searchParams.type);
      }
    }

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 응답 오류:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: url.toString()
        });
        throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
      }

      const responseText = await response.text();
      
      // 전체 응답 로그 출력
      console.group('🔵 API 응답 정보');
      console.log('📡 요청 URL:', url.toString());
      console.log('📦 응답 상태:', response.status, response.statusText);
      console.log('📄 응답 전체 본문:');
      console.log(responseText);
      console.log('📏 응답 길이:', responseText.length, '자');
      console.groupEnd();

      let data: ApiResponse;
      try {
        data = JSON.parse(responseText);
        console.group('✅ JSON 파싱 성공');
        console.log('📊 파싱된 데이터:', data);
        console.log('🔍 데이터 타입:', Array.isArray(data) ? '배열' : typeof data);
        if (typeof data === 'object' && data !== null) {
          console.log('🔑 객체 키:', Object.keys(data));
        }
        console.groupEnd();
      } catch (parseError) {
        console.group('❌ JSON 파싱 오류');
        console.error('오류:', parseError);
        console.error('응답 텍스트:', responseText);
        console.groupEnd();
        throw new Error(`API 응답 파싱 실패: ${parseError}`);
      }

      // 응답 구조 확인
      console.log('파싱된 API 응답:', {
        hasSuccess: 'success' in data,
        hasData: 'data' in data,
        hasMessage: 'message' in data,
        dataType: Array.isArray(data) ? 'array' : typeof data,
        keys: Object.keys(data)
      });

      // 응답이 배열인 경우 (직접 배열 반환)
      if (Array.isArray(data)) {
        console.log('응답이 배열입니다. 직접 반환합니다.');
        return data as ParkingLotDto[];
      }

      // 응답이 객체인 경우
      if (typeof data === 'object' && data !== null) {
        // success 필드가 있고 false인 경우
        if ('success' in data && !data.success) {
          const message = 'message' in data ? data.message : '알 수 없는 오류';
          throw new Error(`API 요청 실패: ${message}`);
        }

        // data 필드가 있는 경우
        if ('data' in data) {
          return Array.isArray(data.data) ? data.data : [];
        }

        // data 필드가 없지만 배열인 경우 (응답 자체가 배열)
        if (Array.isArray(data)) {
          return data as ParkingLotDto[];
        }
      }

      // 예상치 못한 응답 구조
      console.error('예상치 못한 응답 구조:', data);
      throw new Error('API 응답 구조가 예상과 다릅니다.');
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`API 요청 실패: ${error}`);
    }
  }
}

