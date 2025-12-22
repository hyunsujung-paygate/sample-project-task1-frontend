import { ParkingLotRepository } from '@/domain/ParkingLot/ParkingLotRepository';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';
import { ParkingLotService } from '@/domain/ParkingLot/ParkingLotService';

/**
 * 주차장 목록 조회 유스케이스
 */
export class GetParkingLotsUseCase {
  private readonly parkingLotRepository: ParkingLotRepository;
  private readonly parkingLotService: ParkingLotService;

  constructor(parkingLotRepository: ParkingLotRepository) {
    this.parkingLotRepository = parkingLotRepository;
    this.parkingLotService = new ParkingLotService();
  }

  /**
   * 주차장 목록을 조회한다
   *
   * @returns 주차장 목록
   */
  public async execute(): Promise<ParkingLot[]> {
    const parkingLots = await this.parkingLotRepository.findAll();
    return this.parkingLotService.filterValidLocations(parkingLots);
  }
}

