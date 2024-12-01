import {defineConfig} from 'astro/config';
import mdx from "@astrojs/mdx";
import vue from '@astrojs/vue';
// import { imageService } from "@unpic/astro/service";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  /*
  image: {
    service: imageService({
      fallbackService: "netlify",
      placeholder: "blurhash",
      // This is the default
      layout: "constrained"
    })
  }, */
  experimental: {
    // assets: true
  },
  // integrations: [mdx()],

  integrations: [vue({
    // appEntrypoint: '/src/pages/_app',
    devtools: true,
    jsx: true,
    /*
    jsx: {
        // treat any tag that starts with ion- as custom elements
        // isCustomElement: (tag) => tag.startsWith('ion-'),
    } */
  }), mdx(),],
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
  adapter: netlify({

  })
});
