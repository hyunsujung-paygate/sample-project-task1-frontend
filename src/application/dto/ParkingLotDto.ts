/**
 * 주차장 데이터 전송 객체
 */
export interface ParkingLotDto {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  operatingHours?: string;
}

