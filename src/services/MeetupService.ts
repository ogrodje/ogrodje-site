import {HyGraphService} from "./HyGraphService.ts";
import type {Meetup, MeetupEvent} from "../model/Meetup.ts";

export class MeetupService extends HyGraphService {
  private static fields: string = `
    id
    name
    homePageUrl
    meetupUrl
    discordUrl
    linkedInUrl
  `

  public static async allMeetups(): Promise<[Meetup, MeetupEvent[]][]> {
    return this.query(`
      query AllMeetups($size: Int) {
        meetups(first: $size) {
          ${this.fields}
        }
      }
    `)
      .then(data => data.meetups as Array<Meetup>)
      .then(meetups => meetups.map(meetup => this.collectEvents(meetup)))
  }

  private static collectEvents(meetup: Meetup): [Meetup, MeetupEvent[]] {
    let events: MeetupEvent[] = []
    if (meetup.meetupUrl) events.push(...this.collectFromMeetup(meetup.meetupUrl))
    return [meetup, events]
  }

  private static collectFromMeetup(url: String): MeetupEvent[] {
    console.log(`Collecting events from ${url}`)
    // TODO: Continue here.
    return []
  }
}
