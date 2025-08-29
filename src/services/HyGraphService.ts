import {HYGRAPH_ENDPOINT} from 'astro:env/client';

export class HyGraphService {

  static async query(query: string, variables: any = {}): Promise<any> {
    return fetch(
      HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({query: query, variables: variables}),
      }
    )
      .then(r => {
        return r.json()
      })
      .then(raw => {
        if (raw['data']) {
          return raw['data'];
        } else {
          console.error("HyGraph response:", raw['errors']);

          throw new Error("Unable to parse response from HyGraph. No data returned.");
        }
      });
  }
}
