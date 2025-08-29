import slugify from "@sindresorhus/slugify";
import type {Person} from "./Person";
import type {Organisation} from "./Organisation.ts";

export interface Show {
  id: string
  name: string
  color: string
}

export enum Stage {
  Draft = "DRAFT",
  Published = "PUBLISHED"
}

export interface Episode {
  code: string
  name: string
  summary: string
  machineSummary?: string
  airedAt: string
  show?: Show
  topic?: Topic
  stage: Stage
  host: Person
  cohosts: Person[]
  guests: Person[]
  multimediaProducers: Person[]
  consultants: Person[]
  designers: Person[],
  supporters: Organisation[],
  thumbnail?: { url: string },
  boxThumbnail?: { url: string }
}

export interface Topic {
  name: string
}

export const episodePath = (episode: { code: string, show?: { name: string }, name: string }): string =>
  `${episode.code}-${slugify(optimiseEpisodeTitle(episode))}`

export const episodePeople = (episode: Episode): Array<Person> =>
  ['cohosts', 'guests', 'multimediaProducers']
    .flatMap(role => (
      ((episode as any)[role] as Person[])
        .map(e => ({...e, ...{role: role}}))
    ) || [])

export const optimiseEpisodeTitle = (episode: { show?: { name: string }, name: string }): string =>
  episode.show ? (
    episode.name
      .replace(`${episode.show.name}:`, "")
      .replace(`${episode.show.name}`, "")
      .trim()

  ) : episode.name
;

const toolMapping: Map<string, string[]> = new Map([
  ['view', ['youTubeUrl', 'spotifyUrl']],
  ['listen', ['applePodcastsUrl', 'anchorUrl', 'castboxUrl', 'overcastUrl', 'pocketCasts']]
])

export const episodeTools = (epizode: Episode): Map<string, any> => {
  // @ts-ignore
  return new Map(
    // @ts-ignore
    Array
      .from(toolMapping.entries())
      .map(([kind, channels]) => {
          return [kind, channels
            .map(lookupChannel => {
              const value = (epizode as any)[lookupChannel] || undefined;
              return [lookupChannel, value]
            })
            .filter(([_k, v]) => v !== undefined)
          ]
        }
      )
      // @ts-ignore
      .filter(([_kind, channels]) =>
        channels.length != 0
      )
  )
}

export const withTool = (tools: any, kind: string, name: string, has: (url: string) => string) => {
  var value = undefined;
  // @ts-ignore
  try {
    // @ts-ignore
    value = (tools.get(kind) || []).find(([k, _]) => k == `${name}Url`)[1] || undefined;
  } catch (e) {
    value = undefined
  }
  return value !== undefined ? has(value) : ''
}

export function convertToRoman(num: number): string {
  const search = {
    "0": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    "1": ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    "2": ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    "3": ["M", "MM", "MMM", "MV^", "V^", "V^M", "V^MM", "V^MMM", "MX^"],
  };

  let numArr = num.toString().split("").reverse();
  let romanReturn = [];
  for (var i = 0; i < numArr.length; i++) {
    // @ts-ignore
    romanReturn.unshift(search[i][numArr[i] - 1]);
  }
  return romanReturn.join("");
}
