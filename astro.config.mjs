import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
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
  integrations: [mdx()],
  output: "hybrid",
  adapter: netlify({

  })
});
