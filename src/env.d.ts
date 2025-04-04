/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
    readonly HYGRAPH_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
