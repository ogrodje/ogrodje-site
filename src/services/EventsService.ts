import type {Event} from "./goo/Events.ts";
import type {GooEndpoint} from "./GooService.ts";
import {stringToCESTDate} from "./Utils.ts";
import {GOO_ENDPOINT} from 'astro:env/client';

export class EventsService {
  static gooEndpoint: GooEndpoint = GOO_ENDPOINT;

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
}
