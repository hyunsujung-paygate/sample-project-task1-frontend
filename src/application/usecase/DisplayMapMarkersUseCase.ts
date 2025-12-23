import {
  ParkingLotRepository,
  ParkingLotSearchParams,
} from '@/domain/ParkingLot/ParkingLotRepository';
import { MapService } from '@/domain/Map/MapService';
import { ParkingLotService } from '@/domain/ParkingLot/ParkingLotService';
import { ApiConstants } from '@/shared/constants/ApiConstants';

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
   *
   * @param searchParams 검색 파라미터
   */
  public async execute(searchParams?: ParkingLotSearchParams): Promise<void> {
    const parkingLots = searchParams
      ? await this.parkingLotRepository.findBySearchParams(searchParams)
      : await this.parkingLotRepository.findAll();
    const validParkingLots = this.parkingLotService.filterValidLocations(
      parkingLots
    );

    // 서울시 중심으로 지도 초기화
    await this.mapService.initializeMap(
      'map',
      ApiConstants.SEOUL_CENTER_LATITUDE,
      ApiConstants.SEOUL_CENTER_LONGITUDE
    );

    if (validParkingLots.length > 0) {
      this.mapService.displayMarkers(validParkingLots);
    }
  }
}

