import type {KeycloakConfig} from "keycloak-js";

export const configForKeycloak: () => KeycloakConfig = () => {


    const config = {
        url: import.meta.env.KEYCLOAK_URL,
        realm: import.meta.env.KEYCLOAK_REALM,
        clientId: import.meta.env.KEYCLOAK_CLIENT_ID,
    } as KeycloakConfig;

    console.log("Keycloak config: ", config);

    return config;
}

