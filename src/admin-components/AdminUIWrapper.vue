<template>
  <div id="app"></div>
</template>
<script setup lang="ts">
import {createApp, defineProps, onMounted} from 'vue';
import {configForKeycloak} from "../services/KeycloakClient.ts";
import {useKeycloak, vueKeycloak} from '@josempgon/vue-keycloak'
import Keycloak from "keycloak-js";
import {type GooEndpoint, GooSingletonService} from "../services/GooService";
import App from './App.vue';
import {initRouter} from './router';

const keycloakConfig = configForKeycloak()
const {keycloak} = useKeycloak()

interface Props {
  gooEndpoint: GooEndpoint;
}

const {gooEndpoint} = defineProps<Props>();

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

  GooSingletonService.initService({
    endpoint: gooEndpoint,
    keycloak: keycloak.value as Keycloak
  });

  app.use(initRouter());
  app.mount('#app');
});
</script>
<style lang="scss" scoped>
@use 'sass:color';
</style>
