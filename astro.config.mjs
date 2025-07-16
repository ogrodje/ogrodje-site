import {defineConfig, envField} from 'astro/config';
import mdx from "@astrojs/mdx";
import vue from '@astrojs/vue';
// import { imageService } from "@unpic/astro/service";

import netlify from "@astrojs/netlify";
import { imageService } from "@unpic/astro/service";

// https://astro.build/config
export default defineConfig({
  // redirects: {"/admin/[...slug]": "/admin/"},

  /*
  image: {
    service: imageService({
      fallbackService: "netlify",
      placeholder: "blurhash",
      // This is the default
      layout: "constrained"
    })
  }, */

  image: {
    service: imageService(),
    // domains: ["astro.build"],
    // remotePatterns: [{protocol: "https"}],
  },
  experimental: {
    // assets: true
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },

  output: "static",
  adapter: netlify({})
});
