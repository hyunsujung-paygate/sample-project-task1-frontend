import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DisplayMapMarkersUseCase } from '@/application/usecase/DisplayMapMarkersUseCase';
import { ParkingLotRepository } from '@/domain/ParkingLot/ParkingLotRepository';
import { MapService } from '@/domain/Map/MapService';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';

describe('DisplayMapMarkersUseCase', () => {
  let useCase: DisplayMapMarkersUseCase;
  let mockRepository: ParkingLotRepository;
  let mockMapService: MapService;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findBySearchParams: vi.fn(),
      findById: vi.fn(),
    } as unknown as ParkingLotRepository;

    mockMapService = {
      initializeMap: vi.fn(),
      displayMarkers: vi.fn(),
      clearMarkers: vi.fn(),
    } as unknown as MapService;

    useCase = new DisplayMapMarkersUseCase(mockRepository, mockMapService);
  });

  it('주차장 목록을 조회하고 지도에 마커를 표시해야 한다', async () => {
    // Arrange
    const mockParkingLots = [
      new ParkingLot(
        1,
        '테스트 주차장',
        '서울시 강남구',
        37.5665,
        126.9780,
        10,
        null,
        'PUBLIC',
        null,
        null
      ),
    ];
    vi.mocked(mockRepository.findAll).mockResolvedValue(mockParkingLots);
    vi.mocked(mockMapService.initializeMap).mockResolvedValue();

    // Act
    await useCase.execute();

    // Assert
    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(mockMapService.initializeMap).toHaveBeenCalled();
    expect(mockMapService.displayMarkers).toHaveBeenCalledWith(mockParkingLots);
  });

  it('검색 파라미터가 있으면 findBySearchParams를 호출해야 한다', async () => {
    // Arrange
    const searchParams = { district: '강남구' };
    const mockParkingLots = [
      new ParkingLot(
        1,
        '테스트 주차장',
        '서울시 강남구',
        37.5665,
        126.9780,
        10,
        null,
        'PUBLIC',
        null,
        null
      ),
    ];
    vi.mocked(mockRepository.findBySearchParams).mockResolvedValue(mockParkingLots);
    vi.mocked(mockMapService.initializeMap).mockResolvedValue();

    // Act
    await useCase.execute(searchParams);

    // Assert
    expect(mockRepository.findBySearchParams).toHaveBeenCalledWith(searchParams);
    expect(mockMapService.initializeMap).toHaveBeenCalled();
    expect(mockMapService.displayMarkers).toHaveBeenCalledWith(mockParkingLots);
  });
});

