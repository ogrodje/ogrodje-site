# Ogrodje Site

[![Ogrodje Site Build](https://github.com/ogrodje/ogrodje-site/actions/workflows/build.yml/badge.svg)](https://github.com/ogrodje/ogrodje-site/actions/workflows/build.yml)

This is the source code for the main [Ogrodje] website.

Build with [Astro Build][astro-build], `TypeScript` and [Vue.js][vuejs].

```bash
yarn install
yarn run dev

# Deploy to production
yarn run build && netlify deploy --prod
```

## Notes

- In production the site rebuild daily (to refresh events) or when content changes (via Webhooks integration with our CMS (HyGraph))
- It is possible to trigger rebuild manualy from the GitHub Actions panel.
- The admin section is protected via our Keycloak setup.

## Author

- [Oto Brglez](https://github.com/otobrglez)

[astro-build]: https://astro.build/
[vuejs]: https://vuejs.org/
[Ogrodje]: https://ogrodje.si
