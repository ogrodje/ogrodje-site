export interface Event {
  id: string
  meetupID: string
  source: string
  sourceURL: string
  title: string
  eventURL?: string
  meetupName?: string
  startDateTime: string
  endDateTime?: string
  hasStartTime: boolean
  hasEndTime: boolean
  locationName?: string
  locationAddress?: string
  description?: string,
  localStartDateTime: Date,
  localEndDateTime?: Date,
}

const convertToCEST = (isoDatetime: string): Date => {
  const utcDate = new Date(isoDatetime);

  if (isNaN(utcDate.getTime())) {
    throw new Error('Invalid ISO datetime format');
  }

  const utcOffsetMinutes = utcDate.getUTCMinutes() + (utcDate.getTimezoneOffset() + 120); // Add +120 for CEST (UTC+2)
  const cestDate = new Date(utcDate);

  cestDate.setMinutes(utcOffsetMinutes);

  return cestDate;
}

export class EventsService {
  static eventsEndpoint: string = "https://goo.ogrodje.si";

  static async timeline(): Promise<Event[]> {
    return fetch(`${this.eventsEndpoint}/timeline`)
      .then((res) => res.json())
      .then((json) => json.map((e: any) => ({
        ...e,
        localStartDateTime: convertToCEST(e.startDateTime),
        localEndDateTime: e.endDateTime ? convertToCEST(e.endDateTime) : undefined
      })))
      ;
  }

}
