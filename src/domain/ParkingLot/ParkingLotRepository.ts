import { ParkingLot } from './ParkingLot';

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
   * 검색 조건에 맞는 주차장을 조회한다
   *
   * @param searchParams 검색 파라미터
   * @returns 주차장 목록
   */
  findBySearchParams(searchParams?: ParkingLotSearchParams): Promise<ParkingLot[]>;

  /**
   * ID로 주차장을 조회한다
   *
   * @param id 주차장 ID
   * @returns 주차장
   */
  findById(id: number): Promise<ParkingLot | null>;
}

