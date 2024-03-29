const dateFormat = {
  FULL: 1,
  FULL_WITH_TIME: 2,
  SHORT: 3,
  SHORT_WITH_TIME: 4,
  TIME: 5,
  DAY_MONTH_TIME: 6,
  DAY_MONTH_YEAR_TIME: 7,
  INVERTED_YEAR_MONTH_DAY: 8,
  WEEKDAY_DAY_MONTH: 9,
  DAY_FULL_MONTH_YEAR_TIME: 10,
  DAY_OF_MONTH: 11,
  FULL_DAY_OF_WEEW: 12,
  DATE_FROM_NOW: 13,
  DATE_FROM_NOW_WITH_TIME: 14,
  CLOSE_DATE: 15,
  SHORT_DATE_TIME_WITH_SECONDS: 16,
  INVERTED_YEAR_MONTH_DAY_TIME_TZ: 17,
  DATE_FROM_NOW_WITH_SHORT_MONTH_AND_TIME: 18, // Сегодня в 12:00 / 1 февр. в 12:00 / 1 янв. 2022 в 12:00
  CONTRACT_DATE: 19 // "01" января 1970 г.
};

export {
  dateFormat
};