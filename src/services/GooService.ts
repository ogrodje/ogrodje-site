import {stringToCESTDate} from "./Utils.ts";
import type {Meetup, Event, Me} from "./goo/Events.ts";
import Keycloak from "keycloak-js";

export type GooEndpoint = string;

export type GooConfig = {
    endpoint: GooEndpoint,
    keycloak: Keycloak,
}

export class GooSingletonService {
    private readonly endpoint: URL
    private readonly keycloak: Keycloak

    private constructor(endpoint: URL, keycloak: Keycloak) {
        this.endpoint = endpoint;
        this.keycloak = keycloak;
    }

    private static instance: GooSingletonService;

    /*
    public static install(endpoint: GooEndpoint): void {
      GooSingletonService.instance = new GooSingletonService(new URL(endpoint));
    }
    */

    public static initService(config: GooConfig): void {
        GooSingletonService.instance = new GooSingletonService(
            new URL(config.endpoint),
            config.keycloak,
        );
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

    mapToParams = (map: Map<string, string>) => new URLSearchParams(
        Array.from(map.entries()).map(([key, value]) => [key, String(value)])
    );

    public getAuthTokens(): { [key: string]: string } {
        const [accessToken, _] = [this.keycloak.token, this.keycloak.refreshToken]
        return {
            'Authorization': `Bearer ${accessToken}`
        }
    }

    public async fetchAuthenticated(
        path: string,
        paramsMap: Map<string, string> = new Map(),
        method: string = 'GET',
        body: any = undefined
    ): Promise<any> {
        const url: URL = this.withPath(`${path}?${this.mapToParams(paramsMap).toString()}`);
        var headers = {...this.getAuthTokens(),};
        if (body !== undefined) {
            headers['Content-Type'] = 'application/json';
        }

        const fetchOptions: RequestInit = {
            method,
            headers,
            ...(body !== undefined && {body: JSON.stringify(body)}),
        };

        let response = await fetch(url, fetchOptions);

        if (response.status === 401) {
            try {
                const refreshed = await this.keycloak.updateToken();
                if (refreshed) {
                    console.log(`Token was refreshed.`);
                    response = await fetch(url, fetchOptions);
                } else {
                    console.error("Token is still valid.");
                    response = await fetch(url, fetchOptions);
                }
            } catch (err) {
                console.error("Refreshing token has failed... do the login again with error: ", err);
                throw new Error("Reauthentication with Keycloak required.");
            }
        }

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
    }


    public async get(path: string, params: Map<string, string> = new Map()): Promise<any> {
        return this.fetchAuthenticated(path, params, 'GET')
    }

    public async post<A>(path: string, body: A, params: Map<string, string> = new Map()): Promise<any> {
        return this.fetchAuthenticated(path, params, 'POST', body)
    }

    public async put<A>(path: string, body: A, params: Map<string, string> = new Map()): Promise<any> {
        return this.fetchAuthenticated(path, params, 'PUT', body)
    }
}

export class GooService {
    get = (path: string, params: Map<string, string> = new Map()) => GooSingletonService.getInstance().get(path, params)

    post<A>(path: string, body: A, params: Map<string, string> = new Map()) {
        return GooSingletonService.getInstance().post(path, body, params)
    }

    put<A>(path: string, body: A, params: Map<string, string> = new Map()) {
        return GooSingletonService.getInstance().put(path, body, params)
    }
}

export class GooAPIService extends GooService {
    private static api: GooAPIService = new GooAPIService();

    static async events(query?: string, limit?: number, offset?: number): Promise<Event[]> {
        return this.api.get(`/events`, new Map(
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

    static async createEvent(event: Event): Promise<Event> {
        return this.api.post(`/events`, event)
    }

    static async updateEvent(id: String, event: Event): Promise<Event> {
        console.log("event", event);
        return this.api.put(`/events/${id}`, event)
    }

    static async meetups(query?: string, limit?: number, offset?: number): Promise<Meetup[]> {
        return this.api.get(`/meetups`, new Map(
            [
                limit !== undefined ? ['limit', String(limit)] : undefined,
                offset !== undefined ? ['offset', String(offset)] : undefined,
                query && query.trim() !== '' ? ['query', query] : undefined,
            ].filter((tuple): tuple is [string, string] => !!tuple)
        ));
    }

    static async me(): Promise<Me> {
        return this.api.get(`/me`);
    }
}
