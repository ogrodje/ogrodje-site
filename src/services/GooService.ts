import {stringToCESTDate} from "./Utils.ts";
import type {Meetup, Event} from "./goo/Events.ts";

export type GooEndpoint = string;

export class GooSingletonService {
  private readonly endpoint: URL

  private constructor(endpoint: URL) {
    this.endpoint = endpoint;
  }

  private static instance: GooSingletonService;

  public static install(endpoint: GooEndpoint): void {
    GooSingletonService.instance = new GooSingletonService(new URL(endpoint));
  }

  public static getInstance(): GooSingletonService {
    if (!GooSingletonService.instance) {
      throw new Error("GooSingletonService not initialized.");
      /*
      GooSingletonService.instance = new GooSingletonService(
        new URL(rawGooEndpoint)
      ); */
    }
    return GooSingletonService.instance;
  }

  /*
  public static getInstance(): GooSingletonService {
    if (!GooSingletonService.instance) {
      GooSingletonService.instance = new GooSingletonService(
        new URL(rawGooEndpoint)
      );
    }
    return GooSingletonService.instance;
  }
  */

  private withPath(path: string): URL {
    return new URL(path, this.endpoint.toString())
  }

  public async get(path: string, paramsMap: Map<string, string> = new Map()): Promise<any> {
    const params: URLSearchParams = new URLSearchParams(
      Array.from(paramsMap.entries()).map(([key, value]) => [key, String(value)])
    );

    return fetch(this.withPath(`${path}?${params.toString()}`)).then(r => r.json())
  }
}

export class GooService {
  get = (path: string, params: Map<string, string> = new Map()) => GooSingletonService.getInstance().get(path, params)
}

export class GooAPIService extends GooService {
  private static instance: GooAPIService = new GooAPIService();

  static async events(query?: string, limit?: number, offset?: number): Promise<Event[]> {
    return this.instance.get(`/events`, new Map(
      [
        limit !== undefined ? ['limit', String(limit)] : undefined,
        offset !== undefined ? ['offset', String(offset)] : undefined,
        query && query.trim() !== '' ? ['query', query] : undefined,
      ].filter((tuple): tuple is [string, string] => !!tuple)
    )).then((json) => json.map((e: any) => ({
      ...e,
      localStartDateTime: stringToCESTDate(e.startDateTime),
      localEndDateTime: e.endDateTime ? stringToCESTDate(e.endDateTime) : undefined
    })))
  }

  static async meetups(query?: string, limit?: number, offset?: number): Promise<Meetup[]> {
    return this.instance.get(`/meetups`, new Map(
      [
        limit !== undefined ? ['limit', String(limit)] : undefined,
        offset !== undefined ? ['offset', String(offset)] : undefined,
        query && query.trim() !== '' ? ['query', query] : undefined,
      ].filter((tuple): tuple is [string, string] => !!tuple)
    ));
  }

}
