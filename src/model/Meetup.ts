import slugify from "@sindresorhus/slugify";

export interface Meetup {
  id: string,
  name: string,

  homePageUrl?: string,
  meetupUrl?: string,
  discordUrl?: string,
  linkedInUrl?: string,
}

export const meetupPath = (meetup: Meetup) =>
  slugify(meetup.name)

export interface MeetupEvent {
  name: String
}
