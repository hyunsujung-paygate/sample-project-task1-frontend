import { ParkingLot } from './ParkingLot';

/**
 * 주차장 도메인 서비스
 */
export class ParkingLotService {
  /**
   * 주차장 목록에서 유효한 위치 정보를 가진 주차장만 필터링한다
   *
   * @param parkingLots 주차장 목록
   * @returns 유효한 주차장 목록
   */
  public filterValidLocations(parkingLots: ParkingLot[]): ParkingLot[] {
    return parkingLots.filter((parkingLot) => parkingLot.isValidLocation());
  }
}

