import { ParkingLotRepository } from '@/domain/ParkingLot/ParkingLotRepository';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';
import { SeoulOpenApiClient } from '../api/SeoulOpenApiClient';
import { ParkingLotDto } from '@/application/dto/ParkingLotDto';

/**
 * 주차장 리포지토리 구현체
 */
export class ParkingLotRepositoryImpl implements ParkingLotRepository {
  private readonly seoulOpenApiClient: SeoulOpenApiClient;

  constructor() {
    this.seoulOpenApiClient = new SeoulOpenApiClient();
  }

  /**
   * 모든 주차장을 조회한다
   *
   * @returns 주차장 목록
   */
  public async findAll(): Promise<ParkingLot[]> {
    const parkingLotDtos = await this.seoulOpenApiClient.getParkingLots(1, 1000);
    return this.toDomainEntities(parkingLotDtos);
  }

  /**
   * ID로 주차장을 조회한다
   *
   * @param id 주차장 ID
   * @returns 주차장
   */
  public async findById(id: string): Promise<ParkingLot | null> {
    const parkingLots = await this.findAll();
    return parkingLots.find((lot) => lot.id === id) || null;
  }

  /**
   * DTO를 도메인 엔티티로 변환한다
   *
   * @param dtos DTO 목록
   * @returns 도메인 엔티티 목록
   */
  private toDomainEntities(dtos: ParkingLotDto[]): ParkingLot[] {
    return dtos.map(
      (dto) =>
        new ParkingLot(
          dto.id,
          dto.name,
          dto.address,
          dto.latitude,
          dto.longitude,
          dto.capacity,
          dto.operatingHours
        )
    );
  }
}

