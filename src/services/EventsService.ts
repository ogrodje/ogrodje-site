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
  description?: string
}

export class EventsService {
  static eventsEndpoint: string = "https://goo.ogrodje.si";

  static async timeline(): Promise<Event[]> {
    return fetch(`${this.eventsEndpoint}/timeline`).then((res) => res.json());
  }

}
