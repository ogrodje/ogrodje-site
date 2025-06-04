import type {KeycloakConfig} from "keycloak-js";
import {KEYCLOAK_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID} from 'astro:env/client';

export const configForKeycloak: () => KeycloakConfig = () => {
    return {
        url: KEYCLOAK_URL,
        realm: KEYCLOAK_REALM,
        clientId: KEYCLOAK_CLIENT_ID,
    } as KeycloakConfig
}

