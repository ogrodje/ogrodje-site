import {type Person, sortedPeople, type WithConnectedEpisodes} from "../model/Person.ts";
import {ALL_ROLES} from "../model/Role.ts";
import {HyGraphService} from "./HyGraphService.ts";


export class PeopleService extends HyGraphService {

  static allRoles() {
    return ALL_ROLES.map(role => (
      `${role}(first: 500, orderBy: airedAt_DESC) { entryId: id, ... EpisodeF }`)).join("\n")
  }

  static avatarFragment = `
    fragment Avatar on Person {
      avatar {
        url(transformation: { image: { resize: { fit: crop, height: 200, width: 200 } } })
      }
    }
  `
  static episodeFragment = `
    fragment EpisodeF on Episode {
      name
      code
      airedAt
      show { name color }
    }
  `

  static allSocials: string = `
    socialFacebook
    socialHomepage
    socialInstagram
    socialLinkedIn
    socialTwitter
  `

  public static async allPeople(pageSize: number = 300): Promise<Array<Person & WithConnectedEpisodes>> {
    return this.query(`
      query AllPeople($size: Int) {
        people(first: $size, orderBy: fullName_ASC) {
          nickname
          fullName
          email
          bio
          ${this.allSocials}
          ... Avatar
          ${this.allRoles()}
        }
      }
      ${this.avatarFragment}
      ${this.episodeFragment}
      `, {size: pageSize}
    )
      .then(data => data.people as Array<Person & WithConnectedEpisodes>)
      .then(sortedPeople)
  }

  public static async teamMembers(pageSize: number = 30): Promise<Person[]> {
    return this.query(`
      query AllPeople($size: Int) {
        people(first: $size, orderBy: fullName_ASC, where: { isTeamMember: true }) {
          nickname
          fullName
          email
          bio
          ... Avatar
          ${this.allRoles()}
        }
      }
      ${this.avatarFragment}
      ${this.episodeFragment}
      `, {size: pageSize}
    )
      .then(data => data.people as Array<Person & WithConnectedEpisodes>)
      .then(sortedPeople)
  }
}
