import slugify from "@sindresorhus/slugify";
import type {Person} from "./Person";

export interface Show {
  id: string
  name: string
  color: string
}

export interface Episode {
  code: string
  name: string
  summary: string
  airedAt: string
  show?: Show
  topic?: Topic

  host: Person
  cohosts: Person[]
  guests: Person[]
  multimediaProducers: Person[]
  consultants: Person[]
  designers: Person[]
}

export interface Topic {
  name: string
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

export function convertToRoman(num: number) {
  const search = {
    "0": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    "1": ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    "2": ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    "3": ["M", "MM", "MMM", "MV^", "V^", "V^M", "V^MM", "V^MMM", "MX^"],
  };

  var numArr = num.toString().split("").reverse();
  var romanReturn = [];
  for (var i = 0; i < numArr.length; i++) {
    // @ts-ignore
    romanReturn.unshift(search[i][numArr[i] - 1]);
  }
  return romanReturn.join("");
}
