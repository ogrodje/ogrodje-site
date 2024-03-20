import {HyGraphService} from "./HyGraphService.ts";
import type {Organisation} from "../model/Organisation.ts";

export class OrganisationService extends HyGraphService {
  static commonFields = `
    id
    name
    bio
    avatar {
      url
    }
  `

  public static async getListedSupporters(size: number = 10): Promise<Organisation[]> {
    return this.query(
      `query GetListedOrganisations($size: Int) {
          organisations(first: $size, where: {listed: true}, orderBy: name_ASC) {
          ${this.commonFields}
        }
      }`, {
        size: size
      }
    ).then(data => data.organisations as Array<Organisation>);
  }
}
