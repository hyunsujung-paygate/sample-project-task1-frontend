/**
 * 주차장 도메인 엔티티
 */
export class ParkingLot {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly capacity?: number,
    public readonly operatingHours?: string
  ) {}

  /**
   * 주차장이 유효한 위치 정보를 가지고 있는지 확인한다
   *
   * @returns 유효 여부
   */
  public isValidLocation(): boolean {
    return (
      this.latitude != null &&
      this.longitude != null &&
      this.latitude >= -90 &&
      this.latitude <= 90 &&
      this.longitude >= -180 &&
      this.longitude <= 180
    );
  }
}

