<template>
  <div id="app"></div>
</template>
<script setup lang="ts">
import {createApp, onMounted, defineProps, inject} from 'vue';
import {vueKeycloak} from '@josempgon/vue-keycloak'
import type {KeycloakConfig} from "keycloak-js";
import {type GooEndpoint, GooSingletonService} from "../services/GooService";

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
      pkceMethod: 'S256'
    }
  });

  GooSingletonService.install(gooEndpoint)

  app.use(initRouter());
  app.mount('#app');
});
</script>
<style lang="scss" scoped>
@use 'sass:color';
</style>
