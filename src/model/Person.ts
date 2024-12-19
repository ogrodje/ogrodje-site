import slugify from "@sindresorhus/slugify";
import type {Episode} from "./Episode";
import {optimiseEpisodeTitle} from "./Episode";
import {Role} from "./Role";

export interface Person {
  fullName: string,
  avatar: { url: string }
  bio?: string
}

export interface WithConnectedEpisodes {
  starred: Episode[]
  hosted: Episode[]
  cohosted: Episode[]
}

export interface EpisodeWithRole {
  role: Role
}

export const personPath = (person: Person): string => {
  return slugify(person.fullName)
}

const sortEpisodesByAired = (a: Episode, b: Episode) => Date.parse(b.airedAt) - Date.parse(a.airedAt);

export const personEpisodes = (person: Person & WithConnectedEpisodes): Array<Episode & EpisodeWithRole> =>
  Object.keys(Role).flatMap(role => (
    (((person as any)[role] as Episode[]) || [])
      .map(e => ({
        ...e, ...{
          role: (role as Role),
          name: optimiseEpisodeTitle(e)
        }
      }))
  ) || [])
    .sort(sortEpisodesByAired)


export const groupedPersonEpisodes = (person: Person & WithConnectedEpisodes): Map<Role, Array<Episode>> =>
  personEpisodes(person)
    .reduce((prev, current) =>
        prev.set(current.role, [...prev.get(current.role) || [], current].sort(sortEpisodesByAired))
      , new Map<Role, Array<Episode>>());

export const personLastEpisode = (person: Person & WithConnectedEpisodes): Episode | undefined => {
  const [last, ..._rest] = personEpisodes(person);
  return last
}

export const personEpisodesCount = (person: Person & WithConnectedEpisodes): Number => personEpisodes(person).length;

export const sortedPeople = (people: Array<Person & WithConnectedEpisodes>): Array<Person & WithConnectedEpisodes> =>
  people
    .map(p => ({...p, ...{episodes_count: personEpisodes(p).length}}))
    .sort((a, b) => b.episodes_count - a.episodes_count)
    .map(p => p as Person & WithConnectedEpisodes)

export const socialChannels = (person: Person) => {
  return ['Homepage', 'LinkedIn', 'Instagram', 'Facebook', 'Twitter']
    .map((channel) => (
      {
        channel: channel,
        url: (person as any)[`social${channel}`]
      }
    ))
    .filter(({url}) => url != undefined);
}
