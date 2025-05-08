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
  rank?: number,
  meetup?: {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date
  }
}

export interface Meetup {
  id: string
  name: string
  stage: string
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

export type GooEndpoint = string;

export class EventsService {
  static gooEndpoint: GooEndpoint = import.meta.env.GOO_ENDPOINT || 'https://goo.ogrodje.si';

  static async timeline(gooEndpoint: GooEndpoint): Promise<Event[]> {
    return fetch(`${gooEndpoint}/timeline`)
      .then((res) => res.json())
      .then((json) => json.map((e: any) => ({
        ...e,
        localStartDateTime: convertToCEST(e.startDateTime),
        localEndDateTime: e.endDateTime ? convertToCEST(e.endDateTime) : undefined
      })))
      ;
  }

  static async meetups(gooEndpoint: GooEndpoint): Promise<Meetup[]> {
    return fetch(`${gooEndpoint}/meetups`)
      .then((res) => res.json())
      ;
  }

  static async events(gooEndpoint: GooEndpoint): Promise<Event[]> {
    return fetch(`${gooEndpoint}/events`)
      .then((res) => res.json())
      .then((json) => json.map((e: any) => ({
        ...e,
        localStartDateTime: convertToCEST(e.startDateTime),
        localEndDateTime: e.endDateTime ? convertToCEST(e.endDateTime) : undefined
      })))
      ;
  }

}
