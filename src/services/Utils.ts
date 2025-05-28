export function stringToCESTDate(isoDatetime: string): Date {
  const utcDate = new Date(isoDatetime);

  if (isNaN(utcDate.getTime())) {
    throw new Error('Invalid ISO datetime format');
  }

  const utcOffsetMinutes = utcDate.getUTCMinutes() + (utcDate.getTimezoneOffset() + 120); // Add +120 for CEST (UTC+2)
  const cestDate = new Date(utcDate);

  cestDate.setMinutes(utcOffsetMinutes);

  return cestDate;
}
