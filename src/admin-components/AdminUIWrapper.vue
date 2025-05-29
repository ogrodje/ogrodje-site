<template>
  <div id="app"></div>
</template>
<script setup lang="ts">
import {createApp, onMounted, defineProps, inject} from 'vue';
import {useKeycloak, vueKeycloak} from '@josempgon/vue-keycloak'
import type {KeycloakConfig} from "keycloak-js";
import Keycloak from "keycloak-js";
import {type GooEndpoint, GooSingletonService} from "../services/GooService";
const {hasRoles, username, userId, isAuthenticated, keycloak, roles, resourceRoles} = useKeycloak()

interface Props {
  keycloakConfig: KeycloakConfig;
  gooEndpoint: GooEndpoint
}

const {keycloakConfig, gooEndpoint} = defineProps<Props>();

import App from './App.vue';
import {initRouter} from './router';

onMounted(async () => {
  let app = createApp(App)
    .provide('keycloakConfig', keycloakConfig)
    .provide('gooEndpoint', gooEndpoint);

  await vueKeycloak.install(app, {
    config: keycloakConfig,
    initOptions: {
      adapter: 'default',
      onLoad: 'login-required',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    }
  });

  GooSingletonService.install({
    endpoint: gooEndpoint,
    keycloak: keycloak.value as Keycloak
  });

  console.log(keycloak.value?.authenticated, keycloak.value?.refreshToken);


  console.log("pom", isAuthenticated.value, username.value, userId.value, roles.value, resourceRoles.value)

  app.use(initRouter());
  app.mount('#app');
});
</script>
<style lang="scss" scoped>
@use 'sass:color';
</style>
