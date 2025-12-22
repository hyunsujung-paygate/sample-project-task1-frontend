import { ApiConstants } from '@/shared/constants/ApiConstants';
import { ParkingLotDto } from '@/application/dto/ParkingLotDto';

/**
 * 서울시 열린데이터 Open API 클라이언트
 */
export class SeoulOpenApiClient {
  /**
   * 서울시 공영주차장 정보를 조회한다
   *
   * @param startIndex 시작 인덱스
   * @param endIndex 종료 인덱스
   * @returns 주차장 정보 목록
   */
  public async getParkingLots(
    startIndex: number,
    endIndex: number
  ): Promise<ParkingLotDto[]> {
    const apiKey = import.meta.env.VITE_SEOUL_API_KEY;
    const serviceName = ApiConstants.SEOUL_SERVICE_NAME;
    const serviceId = ApiConstants.SEOUL_SERVICE_ID;

    if (!apiKey) {
      throw new Error('서울시 Open API 키가 설정되지 않았습니다.');
    }

    const url = `${ApiConstants.SEOUL_OPEN_API_BASE_URL}/${serviceName}/json/${serviceId}/${startIndex}/${endIndex}`;
    const response = await fetch(`${url}?serviceKey=${apiKey}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return this.parseResponse(data);
  }

  /**
   * API 응답을 파싱한다
   *
   * @param data API 응답 데이터
   * @returns 주차장 정보 목록
   */
  private parseResponse(data: any): ParkingLotDto[] {
    // 실제 API 응답 구조에 맞게 파싱 로직 구현 필요
    // 현재는 스켈레톤 구조만 제공
    return [];
  }
}

