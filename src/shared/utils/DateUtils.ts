/**
 * 날짜 유틸리티 함수
 */
export class DateUtils {
  /**
   * 날짜를 포맷팅한다
   *
   * @param date 날짜
   * @param format 포맷 문자열
   * @returns 포맷팅된 날짜 문자열
   */
  public static formatDate(date: Date, format: string): string {
    // 날짜 포맷팅 로직 구현
    return date.toISOString();
  }
}

