import { MapService } from './MapService';
import { ParkingLot } from '../ParkingLot/ParkingLot';

/**
 * 지도 서비스 구현체
 */
export class MapServiceImpl implements MapService {
  private map: any = null;
  private markers: any[] = [];
  private infoWindows: any[] = [];

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

    // 기존 마커 제거
    this.clearMarkers();

    const bounds = new kakao.maps.LatLngBounds();

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
      this.markers.push(marker);

      bounds.extend(markerPosition);

      const infoContent = `
        <div style="padding:10px;min-width:200px;">
          <h3 style="margin:0 0 8px 0;font-size:14px;font-weight:bold;">${parkingLot.name}</h3>
          <p style="margin:0 0 4px 0;font-size:12px;color:#666;">${parkingLot.address}</p>
          ${parkingLot.totalSpaces > 0 ? `<p style="margin:0 0 4px 0;font-size:12px;">총 주차면수: ${parkingLot.totalSpaces}</p>` : ''}
          ${parkingLot.availableSpaces !== null ? `<p style="margin:0 0 4px 0;font-size:12px;">가용 주차면수: ${parkingLot.availableSpaces}</p>` : ''}
          ${parkingLot.phoneNumber ? `<p style="margin:0;font-size:12px;">전화번호: ${parkingLot.phoneNumber}</p>` : ''}
        </div>
      `;

      const infoWindow = new kakao.maps.InfoWindow({
        content: infoContent,
      });

      this.infoWindows.push(infoWindow);

      kakao.maps.event.addListener(marker, 'click', () => {
        // 다른 정보창 닫기
        this.infoWindows.forEach((iw) => iw.close());
        infoWindow.open(this.map, marker);
      });
    });

    // 마커가 있을 경우 지도 범위 조정
    if (this.markers.length > 0) {
      this.map.setBounds(bounds);
    }
  }

  /**
   * 지도에 표시된 모든 마커를 제거한다
   */
  public clearMarkers(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.infoWindows.forEach((infoWindow) => infoWindow.close());
    this.markers = [];
    this.infoWindows = [];
  }
}

