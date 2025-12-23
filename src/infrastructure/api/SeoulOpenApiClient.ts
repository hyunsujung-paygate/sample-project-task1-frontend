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
 * API 응답 구조
 */
interface ApiResponse {
  success: boolean;
  message: string;
  data: ParkingLotDto[];
  timestamp: string;
}

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
    const url = new URL(
      `${ApiConstants.API_SERVER_BASE_URL}${ApiConstants.PARKING_LOTS_API_PATH}`
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

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success) {
      throw new Error(`API 요청 실패: ${data.message}`);
    }

    return data.data;
  }
}

