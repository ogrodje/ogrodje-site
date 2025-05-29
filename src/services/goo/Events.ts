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

export const emptyEvent: Event = {
  id: '',
  meetupID: '',
  source: '',
  sourceURL: '',
  title: '',
  eventURL: '',
  // meetupName?: string
  startDateTime: '',
  endDateTime: '',
  // hasStartTime: boolean
  // hasEndTime: boolean
  // locationName?: string
  // locationAddress?: string
  // description?: string,
  // localStartDateTime: Date,
  // localEndDateTime?: Date,
} as Event

export interface Meetup {
  id: string
  name: string
  stage: string
}

export interface Me {
  name: string
  email: string
  family_name: string
  given_name: string
  preferred_username: string
  userId: string
}
