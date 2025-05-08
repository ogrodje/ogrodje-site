const daysInSlovenian = ['Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota', 'Nedelja'];

export function dateFromRaw(raw: string) {
  return new Date(raw);
}

export function weekRangeFromMonday(monday: Date): { monday: Date; sunday: Date } {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {monday, sunday};
}

export function weekRangeToHuman(range: { monday: Date; sunday: Date }): string {
  // const [monday, sunday] = [localDayName(range.monday), localDayName(range.sunday)];
  const [monday, sunday] = [range.monday, range.sunday];

  const [mondayH, sundayH] = [
    monday.toLocaleDateString('sl-SI'),
    sunday.toLocaleDateString('sl-SI'),
  ]

  if (monday.getFullYear() === sunday.getFullYear()) {
    return `${mondayH.replace(monday.getFullYear().toString(), "")} - ${sundayH}`;
  } else {
    return `${mondayH} - ${sundayH}`;
  }
}

export function localDayName(date: Date): string {
  const dayIndex = (date.getDay() + 6) % 7;
  return daysInSlovenian[dayIndex];
}

export function localDayNameShort(date: Date): string {
  const dateS = date.toLocaleDateString('sl-SI', {
    day: 'numeric',
    month: 'numeric',
  });
  return `${localDayName(date)}, ${dateS}`;
}

export function localDayNameTiny(date: Date): string {
  return `${localDayName(date)}`;
}

export type EventTimeArgs = {
  startDateTime: Date;
  endDateTime?: Date;
  hasStartTime: boolean;
  hasEndTime: boolean;
};

export function formatEventTime({
                           startDateTime,
                           endDateTime,
                           hasStartTime,
                           hasEndTime,
                         }: EventTimeArgs): string {
  const dateFormatter = new Intl.DateTimeFormat('sl-SI', {dateStyle: 'medium'});
  const timeFormatter = new Intl.DateTimeFormat('sl-SI', {timeStyle: 'short'});

  const formatDate = (date: Date) => dateFormatter.format(date);
  const formatTime = (date: Date) => timeFormatter.format(date);

  if (!endDateTime) {
    return hasStartTime
      ? `${formatDate(startDateTime)} ${formatTime(startDateTime)}`
      : formatDate(startDateTime);
  }

  const isSameDay = startDateTime.toDateString() === endDateTime.toDateString();

  if (isSameDay) {
    const dateStr = formatDate(startDateTime);
    if (hasStartTime && hasEndTime) {
      return `${dateStr} ${formatTime(startDateTime)} – ${formatTime(endDateTime)}`;
    } else if (hasStartTime && !hasEndTime) {
      return `${dateStr} ${formatTime(startDateTime)}`;
    } else {
      return dateStr;
    }
  } else {
    const startStr = hasStartTime
      ? `${formatDate(startDateTime)} ${formatTime(startDateTime)}`
      : formatDate(startDateTime);
    const endStr = hasEndTime
      ? `${formatDate(endDateTime)} ${formatTime(endDateTime)}`
      : formatDate(endDateTime);
    return `${startStr} – ${endStr}`;
  }
}

