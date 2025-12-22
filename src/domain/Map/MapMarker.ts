/**
 * 지도 마커 엔티티
 */
export class MapMarker {
  constructor(
    public readonly id: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly title: string,
    public readonly content?: string
  ) {}
}

