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

export function localInputToUTC(localStr: string | undefined): string | undefined {
  if (!localStr) return undefined;
  // Parse as local time, produce UTC string with seconds, ms & Z
  const d = new Date(localStr);
  return new Date(
    d.getFullYear(), d.getMonth(), d.getDate(),
    d.getHours(), d.getMinutes(), 0, 0
  ).toISOString();
}

export function utcToLocalDateTimeInput(utcString: string | undefined): string {
  if (!utcString) return '';
  const date = new Date(utcString);
  // Use local time components and pad with leading zeroes if needed
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}T${hh}:${mm}`;
}
