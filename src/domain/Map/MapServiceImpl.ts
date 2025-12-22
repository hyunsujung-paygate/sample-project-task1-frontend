import { MapService } from './MapService';
import { ParkingLot } from '../ParkingLot/ParkingLot';

/**
 * 지도 서비스 구현체
 */
export class MapServiceImpl implements MapService {
  private map: any = null;

  /**
   * 지도를 초기화한다
   *
   * @param containerId 지도를 표시할 컨테이너 ID
   * @param latitude 초기 위도
   * @param longitude 초기 경도
   */
  public async initializeMap(
    containerId: string,
    latitude: number,
    longitude: number
  ): Promise<void> {
    const kakao = (window as any).kakao;

    if (!kakao || !kakao.maps) {
      throw new Error('카카오맵 API가 로드되지 않았습니다.');
    }

    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`지도 컨테이너를 찾을 수 없습니다: ${containerId}`);
    }

    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 5,
    };

    this.map = new kakao.maps.Map(container, options);
  }

  /**
   * 주차장 목록을 지도에 마커로 표시한다
   *
   * @param parkingLots 주차장 목록
   */
  public displayMarkers(parkingLots: ParkingLot[]): void {
    if (!this.map) {
      throw new Error('지도가 초기화되지 않았습니다.');
    }

    const kakao = (window as any).kakao;
    if (!kakao || !kakao.maps) {
      throw new Error('카카오맵 API가 로드되지 않았습니다.');
    }

    parkingLots.forEach((parkingLot) => {
      if (!parkingLot.isValidLocation()) {
        return;
      }

      const markerPosition = new kakao.maps.LatLng(
        parkingLot.latitude,
        parkingLot.longitude
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(this.map);

      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${parkingLot.name}</div>`,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }
}

