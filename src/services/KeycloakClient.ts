import type {KeycloakConfig} from "keycloak-js";

export const configForKeycloak: () => KeycloakConfig = () => {
  return {
    url: import.meta.env.KEYCLOAK_URL,
    realm: import.meta.env.KEYCLOAK_REALM,
    clientId: import.meta.env.KEYCLOAK_CLIENT_ID,
  } as KeycloakConfig
}
