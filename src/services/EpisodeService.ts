import {HyGraphService} from "./HyGraphService.ts";
import type {Episode} from "../model/Episode.ts";

export class EpisodeService extends HyGraphService {
  static personFragment = `
  fragment PersonF on Person {
    fullName
    avatar {
      url(transformation: { image: { resize: { fit: crop, height: 200, width: 200 } } })
    }
  }
  `

  public static async allEpisodes(size: number = 200, stage: string = 'PUBLISHED'): Promise<Array<Episode>> {
    return this.query(`
      query AllEpisodes($size: Int, $stage: Stage!) {
        episodes(first: $size, orderBy: airedAt_DESC, stage: $stage) {
          topics { name }
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
          anchorUrl
          applePodcastsUrl
          castboxUrl
          youTubeUrl
          spotifyUrl
        }
      }
      ${this.personFragment}

    `, {
      size: size, stage: stage
    })
      .then(data => data.episodes as Array<Episode>)
  }

  static getSeason(code: string): number {
    // @ts-ignore
    return /^S(\d+)E/.exec(code).slice(1).map(parseInt)[0] || -1
  }

  public static allEpisodesPerSeason(
    size: number = 200, stage: string = 'PUBLISHED'
  ): Promise<Map<number, Episode[]>> {
    return this
      .allEpisodes(size, stage)
      .then(episodes =>
        episodes
          .map((episode => ({season: this.getSeason(episode.code), episode})))
          .reduce((agg, {season, episode}) =>
              agg.set(season, [...(agg.get(season) || []), episode]),
            new Map<number, Array<Episode>>())
      )
  }
}
