import type {Meetup} from "./goo/Events.ts";
import type {GooEndpoint} from "./GooService.ts";
import {stringToCESTDate} from "./Utils.ts";


export class EventsService {
  static gooEndpoint: GooEndpoint = import.meta.env.GOO_ENDPOINT || 'https://goo.ogrodje.si';

  static async timeline(gooEndpoint: GooEndpoint): Promise<Event[]> {
    return fetch(`${gooEndpoint}/timeline`)
      .then((res) => res.json())
      .then((json) => json.map((e: any) => ({
        ...e,
        localStartDateTime: stringToCESTDate(e.startDateTime),
        localEndDateTime: e.endDateTime ? stringToCESTDate(e.endDateTime) : undefined
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
        localStartDateTime: stringToCESTDate(e.startDateTime),
        localEndDateTime: e.endDateTime ? stringToCESTDate(e.endDateTime) : undefined
      })))
      ;
  }

}
