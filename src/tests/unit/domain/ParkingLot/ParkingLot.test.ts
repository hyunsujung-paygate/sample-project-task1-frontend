import { describe, it, expect } from 'vitest';
import { ParkingLot } from '@/domain/ParkingLot/ParkingLot';

describe('ParkingLot', () => {
  it('유효한 위치 정보를 가진 주차장은 isValidLocation이 true를 반환해야 한다', () => {
    // Arrange
    const parkingLot = new ParkingLot(
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
    );

    // Act
    const result = parkingLot.isValidLocation();

    // Assert
    expect(result).toBe(true);
  });

  it('위도가 범위를 벗어나면 isValidLocation이 false를 반환해야 한다', () => {
    // Arrange
    const parkingLot = new ParkingLot(
      1,
      '테스트 주차장',
      '서울시 강남구',
      100.0,
      126.9780,
      10,
      null,
      'PUBLIC',
      null,
      null
    );

    // Act
    const result = parkingLot.isValidLocation();

    // Assert
    expect(result).toBe(false);
  });
});

