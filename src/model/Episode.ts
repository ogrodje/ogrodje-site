import slugify from "@sindresorhus/slugify";
import type {Person} from "./Person";

export interface Show {
  name: string
  color: string
}

export interface Episode {
  code: string
  name: string
  airedAt: string
  show?: Show
}

export const episodePath = (episode: Episode): string =>
  `${episode.code}-${slugify(optimiseEpisodeTitle(episode))}`

export const episodePeople = (episode: Episode): Array<Person> =>
  ['cohosts', 'guests', 'multimediaProducers']
    .flatMap(role => (
      ((episode as any)[role] as Person[])
        .map(e => ({...e, ...{role: role}}))
    ) || [])
// .sort((a, b) => Date.parse(b.airedAt) - Date.parse(a.airedAt))

export const optimiseEpisodeTitle = (epizode: Episode): string =>
  epizode.show ? (
    epizode.name
      .replace(`${epizode.show.name}:`, "")
      .replace(`${epizode.show.name}`, "")
      .trim()

  ) : epizode.name
;
