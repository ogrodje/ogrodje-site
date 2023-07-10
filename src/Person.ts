import slugify from "@sindresorhus/slugify";
import type {Episode} from "./Episode";

export interface Person {
    fullName: string,
    avatar: {
        url: string
    }
}

interface WithConnectedEpisodes {
    starred: Episode[]
    hosted: Episode[]
    cohosted: Episode[]
}

interface EpisodeWithRole {
    role: string
}


export const personPath = (person: Person): string => {
    return slugify(person.fullName)
}

export const parsonAvatar = (person: Person, size: Number = 50): string =>
    `https://media.graphassets.com/output=format:jpg/resize=width:${size},height:${size},fit:crop/${person.avatar.url.split("/").pop()}`;

export const personEpisodes = (person: Person & WithConnectedEpisodes): Array<Episode & EpisodeWithRole> =>
    ['starred', 'hosted', 'cohosted', 'produced']
        .flatMap(role => (
            (((person as any)[role] as Episode[]) || [])
                .map(e => ({...e, ...{role: role}}))
        ) || [])
        .sort((a, b) => Date.parse(b.airedAt) - Date.parse(a.airedAt))

export const personLastEpisode = (person: Person & WithConnectedEpisodes): Episode | undefined => {
    const [last, ..._rest] = personEpisodes(person);
    return last
}

export const personEpisodesCount = (person: Person & WithConnectedEpisodes): Number => personEpisodes(person).length;

export const sortedPeople = (people: Array<Person & WithConnectedEpisodes>): Array<Person & WithConnectedEpisodes> =>
    people.map(p => ({...p, ...{episodes_count: personEpisodes(p).length}}))
        .sort((a, b) => b.episodes_count - a.episodes_count)
        .map(p => p as Person & WithConnectedEpisodes)

const tuneChannelName = (person: Person) => {
    const twitterUrl: string | undefined = (person as any)?.socialTwitter;
    if (twitterUrl) return `${twitterUrl.split("/").pop()}`
    else twitterUrl
}

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
