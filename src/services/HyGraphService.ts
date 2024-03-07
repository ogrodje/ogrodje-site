export class HyGraphService {
  static hyGraphEndpoint: string = import.meta.env.HYGRAPH_ENDPOINT;

  static async query(query: string, variables: any = {}): Promise<any> {
    return fetch(
      this.hyGraphEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({query: query, variables: variables}),
      }
    )
      .then(r => {
        // This is good place to tap into response.
        // console.log(r.json());
        return r.json()
      })
      .then(raw => {
        if (raw['data']) {
          return raw['data'];
        } else {
          throw new Error("Unable to parse response from HyGraph. No data returned.");
        }
      });
  }
}
