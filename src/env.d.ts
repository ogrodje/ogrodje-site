/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
    readonly HYGRAPH_ENDPOINT: string;
    readonly GOO_ENDPOINT?: string;
    readonly KEYCLOAK_URL: string;
    readonly KEYCLOAK_REALM: string;
    readonly KEYCLOAK_CLIENT_ID: string;
    readonly SEARCH_ENDPOINT?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
