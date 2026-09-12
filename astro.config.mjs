import {defineConfig, envField} from 'astro/config';
import mdx from "@astrojs/mdx";
import vue from '@astrojs/vue';
import netlify from "@astrojs/netlify";
import {imageService} from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  image: {
    service: imageService(),
  },
  integrations: [vue({
    devtools: false,
    jsx: true,
  }), mdx(),],

  env: {
    schema: {
      KEYCLOAK_URL: envField.string({context: "client", access: "public", optional: false}),
      KEYCLOAK_REALM: envField.string({context: "client", access: "public", optional: false}),
      KEYCLOAK_CLIENT_ID: envField.string({context: "client", access: "public", optional: false}),
      HYGRAPH_ENDPOINT: envField.string({context: "client", access: "public", optional: false}),
      GOO_ENDPOINT: envField.string({context: "client", access: "public", optional: false}),
      SEARCH_ENDPOINT: envField.string({context: "client", access: "public", optional: false}),
    },
    validateSecrets: true
  },
  output: "static",
  adapter: netlify({})
});
