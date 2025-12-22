import { ParkingLot } from './ParkingLot';

/**
 * 주차장 리포지토리 인터페이스
 */
export interface ParkingLotRepository {
  /**
   * 모든 주차장을 조회한다
   *
   * @returns 주차장 목록
   */
  findAll(): Promise<ParkingLot[]>;

  /**
   * ID로 주차장을 조회한다
   *
   * @param id 주차장 ID
   * @returns 주차장
   */
  findById(id: string): Promise<ParkingLot | null>;
}

