/**
 * 주차장 데이터 전송 객체
 */
export interface ParkingLotDto {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSpaces: number;
  availableSpaces: number | null;
  type: string;
  operatingHours: string | null;
  phoneNumber: string | null;
}

