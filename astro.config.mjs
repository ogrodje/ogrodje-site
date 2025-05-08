import {defineConfig} from 'astro/config';
import mdx from "@astrojs/mdx";
import vue from '@astrojs/vue';
// import { imageService } from "@unpic/astro/service";

import netlify from "@astrojs/netlify";

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
  experimental: {
    // assets: true
  },
  integrations: [vue({
    devtools: false,
    jsx: true,
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
  adapter: netlify({})
});
