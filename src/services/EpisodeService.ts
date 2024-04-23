import {HyGraphService} from "./HyGraphService.ts";
import {type Episode, Stage} from "../model/Episode.ts";

export class EpisodeService extends HyGraphService {
  static personFragment = `
  fragment PersonF on Person {
    fullName
    avatar {
      url(transformation: { image: { resize: { fit: crop, height: 200, width: 200 } } })
    }
  }
  `

  static commonFields: string = `
    topics { name }
    stage
    show {
      id
      name
      color
    }
    summary
    name
    code
    airedAt
    host { ...PersonF }
    cohosts { ...PersonF }
    guests { ... PersonF }
    multimediaProducers { ...PersonF }
    consultants { ...PersonF }
    designers { ...PersonF }
    supporters(orderBy: name_ASC) {
      id, name, bio, avatar { url }
    }
    anchorUrl
    applePodcastsUrl
    castboxUrl
    youTubeUrl
    spotifyUrl
  `

  public static async publishedEpisodes(
    size: number = 200,
    stage: Stage = Stage.Published
  ): Promise<Array<Episode>> {
    return this.query(`
      query PublishedEpisodes($size: Int, $stage: Stage!) {
        episodes(first: $size, orderBy: airedAt_DESC, stage: $stage) {
          ${this.commonFields}
        }
      }
      ${this.personFragment}
    `, {
      size: size, stage: stage
    }).then(data => data.episodes as Array<Episode>)
  }

  static getSeason(code: string): number {
    // @ts-ignore
    return /^S(\d+)E/.exec(code).slice(1).map(parseInt)[0] || -1
  }

  public static async allEpisodesPerSeason(
    size: number = 200, stage: Stage = Stage.Published
  ): Promise<Map<number, Episode[]>> {
    const episodes = await this.publishedEpisodes(size, stage);
    return episodes
      .map((episode => ({season: this.getSeason(episode.code), episode})))
      .reduce((agg, {season, episode: episode_1}) => agg.set(season, [...(agg.get(season) || []), episode_1]),
        new Map<number, Array<Episode>>());
  }

  public static async lastEpisodes(size: number = 3): Promise<Array<Episode>> {
    return this.publishedEpisodes(3)
  }
}
