import slugify from "@sindresorhus/slugify";
import type {Person} from "./Person";

export interface Episode {
    code: string
    name: string
    airedAt: string
}

export const episodePath = (episode: Episode): string =>
    `${episode.code}-${slugify(episode.name)}`

export const episodePeople = (episode: Episode): Array<Person> =>
    ['cohosts', 'guests', 'multimediaProducers']
        .flatMap(role => (
            ((episode as any)[role] as Person[])
                .map(e => ({...e, ...{role: role}}))
        ) || [])
        // .sort((a, b) => Date.parse(b.airedAt) - Date.parse(a.airedAt))
