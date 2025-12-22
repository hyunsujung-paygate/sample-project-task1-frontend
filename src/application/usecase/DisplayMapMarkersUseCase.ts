import { ParkingLotRepository } from '@/domain/ParkingLot/ParkingLotRepository';
import { MapService } from '@/domain/Map/MapService';
import { ParkingLotService } from '@/domain/ParkingLot/ParkingLotService';

/**
 * 지도에 주차장 마커를 표시하는 유스케이스
 */
export class DisplayMapMarkersUseCase {
  private readonly parkingLotRepository: ParkingLotRepository;
  private readonly mapService: MapService;
  private readonly parkingLotService: ParkingLotService;

  constructor(
    parkingLotRepository: ParkingLotRepository,
    mapService: MapService
  ) {
    this.parkingLotRepository = parkingLotRepository;
    this.mapService = mapService;
    this.parkingLotService = new ParkingLotService();
  }

  /**
   * 주차장 목록을 조회하고 지도에 마커를 표시한다
   */
  public async execute(): Promise<void> {
    const parkingLots = await this.parkingLotRepository.findAll();
    const validParkingLots = this.parkingLotService.filterValidLocations(
      parkingLots
    );

    if (validParkingLots.length === 0) {
      return;
    }

    const firstParkingLot = validParkingLots[0];
    await this.mapService.initializeMap('map', firstParkingLot.latitude, firstParkingLot.longitude);
    this.mapService.displayMarkers(validParkingLots);
  }
}

