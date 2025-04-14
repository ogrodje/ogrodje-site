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


