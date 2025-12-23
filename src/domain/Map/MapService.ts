import { ParkingLot } from '../ParkingLot/ParkingLot';

/**
 * 지도 서비스 인터페이스
 */
export interface MapService {
  /**
   * 지도를 초기화한다
   *
   * @param containerId 지도를 표시할 컨테이너 ID
   * @param latitude 초기 위도
   * @param longitude 초기 경도
   */
  initializeMap(containerId: string, latitude: number, longitude: number): Promise<void>;

  /**
   * 주차장 목록을 지도에 마커로 표시한다
   *
   * @param parkingLots 주차장 목록
   */
  displayMarkers(parkingLots: ParkingLot[]): void;

  /**
   * 지도에 표시된 모든 마커를 제거한다
   */
  clearMarkers(): void;
}

