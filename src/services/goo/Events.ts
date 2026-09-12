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
  hiddenAt?: Date,
  promotedAt?: Date,
  rank?: number,
  meetup?: {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    logoImage?: string
    mainColor?: string
    backgroundColor?: string
  }
}

export const emptyEvent: Event = {
  id: '',
  meetupID: '',
  source: '',
  sourceURL: '',
  title: '',
  eventURL: '',
  startDateTime: '',
  endDateTime: '',
} as Event

export interface Meetup {
  id: string
  name: string
  stage: string
}
