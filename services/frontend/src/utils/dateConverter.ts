/* eslint-disable id-denylist */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';
import {dateFormat as dateFormatList} from '@local/enums/tools';

dayjs.extend(utc);
dayjs.locale('ru');

interface StrObj {
  [key: string]: string
}

const formatDateFromNow = (myDayjs: dayjs.Dayjs, formats: StrObj) => {
  const {
    todayFormats,
    yesterdayFormats,
    tomorrowFormats,
    defaultFormats,
    inThisYearFormats
  } = formats;

  const myDayjsWithoutTime = dayjs(myDayjs)
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);
  const nowDayjsWithoutTime = dayjs()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0);

  const myDayjsYear = myDayjs.get('year');
  const nowDayjsYear = dayjs().get('year');

  const diffDays = nowDayjsWithoutTime.diff(myDayjsWithoutTime, 'day');
  const isThisYear = myDayjsYear === nowDayjsYear;

  if (diffDays === -1) {
    return myDayjs.format(tomorrowFormats);
  } else if (diffDays === 0) {
    return myDayjs.format(todayFormats);
  } else if (diffDays === 1) {
    return myDayjs.format(yesterdayFormats);
  } else if (inThisYearFormats && isThisYear) {
    return myDayjs.format(inThisYearFormats);
  }

  return myDayjs.format(defaultFormats);
};

const isTz = (rawDate: string): boolean => rawDate.indexOf('Z') > -1;

const removeTz = (rawDate: string): string => rawDate.slice(0, rawDate.length - 1);

const normalizeDate = (rawDate: string) => {
  if (isTz(rawDate)) {
    return removeTz(rawDate);
  }

  return rawDate;
};

const dateConverter = (
  value: string | dayjs.Dayjs | Date,
  dateFormat: number = dateFormatList.FULL
): string => {
  switch (dateFormat) {
    case dateFormatList.SHORT:
      return dayjs(value).format('DD.MM.YYYY');
    case dateFormatList.SHORT_WITH_TIME:
      return dayjs(value).format('DD.MM.YYYY HH:mm');
    case dateFormatList.FULL_WITH_TIME:
      return dayjs(value).format('DD MMM YYYY HH:mm:ss');
    case dateFormatList.TIME:
      return dayjs(value).format('HH:mm');
    case dateFormatList.DAY_MONTH_TIME:
      return dayjs(value).format('D MMM HH:mm');
    case dateFormatList.DAY_MONTH_YEAR_TIME:
      return dayjs(value).format('D MMM YYYY, HH:mm');
    case dateFormatList.INVERTED_YEAR_MONTH_DAY:
      return dayjs(value).format('YYYY-MM-DD');
    case dateFormatList.WEEKDAY_DAY_MONTH:
      return dayjs(value).format('dddd, DD MMMM');
    case dateFormatList.DAY_FULL_MONTH_YEAR_TIME:
      return dayjs(value).format('D MMMM YYYY HH:mm');
    case dateFormatList.DAY_OF_MONTH:
      return dayjs(value).format('D');
    case dateFormatList.FULL_DAY_OF_WEEW:
      return dayjs(value).format('dddd');
    case dateFormatList.DATE_FROM_NOW:
      return formatDateFromNow(dayjs(value), {
        todayFormats: 'Сегодня',
        yesterdayFormats: 'Вчера',
        tomorrowFormats: 'Завтра',
        inThisYearFormats: 'D MMMM',
        defaultFormats: 'D MMMM YYYY'
      });
    case dateFormatList.DATE_FROM_NOW_WITH_TIME:
      return formatDateFromNow(dayjs(value), {
        todayFormats: 'Сегодня в H:mm',
        yesterdayFormats: 'Вчера в H:mm',
        tomorrowFormats: 'Завтра в H:mm',
        inThisYearFormats: 'D MMMM в H:mm',
        defaultFormats: 'D MMMM YYYY в H:mm'
      });
    case dateFormatList.CLOSE_DATE:
      return formatDateFromNow(dayjs(value), {
        todayFormats: 'Сегодня',
        yesterdayFormats: 'Вчера',
        tomorrowFormats: 'Завтра',
        defaultFormats: 'DD MMM YYYY'
      });
    case dateFormatList.SHORT_DATE_TIME_WITH_SECONDS:
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    case dateFormatList.INVERTED_YEAR_MONTH_DAY_TIME_TZ:
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss (Z)');
    case dateFormatList.CONTRACT_DATE:
      return dayjs(value).format('DD MMMM YYYY l10n(г.)')
        .replace(/^(\d{1,2})/, '"$1"');
    default:
      return dayjs(value).format('DD MMM YYYY');
  }
};

const withTz = (timezone: string) => (rawDate: string, format?: number): string => {
  const _timezone = parseInt(timezone);

  if (isNaN(_timezone)) {
    throw new Error('Invalid timezone');
  }

  const withTimezone = dayjs
    .utc(normalizeDate(rawDate))
    .utcOffset(_timezone);

  return dateConverter(withTimezone, format);
};

export {
  dateConverter,
  withTz,
  isTz,
  removeTz
};
