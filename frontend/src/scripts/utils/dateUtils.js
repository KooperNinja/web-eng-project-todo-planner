
/**
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns 
 */
export function isSameDate(date1, date2) {
  return date1?.toLocaleDateString() === date2?.toLocaleDateString();
}

export function localDateFromUTC(utcDate) {
  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate()
  );
}
