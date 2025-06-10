# Ogrodje Site

[![Ogrodje Site Build](https://github.com/ogrodje/ogrodje-site/actions/workflows/build.yml/badge.svg)](https://github.com/ogrodje/ogrodje-site/actions/workflows/build.yml)

This is the source code for the main [Ogrodje] website.

Built with [Astro Build][astro-build], `TypeScript` and [Vue.js][vuejs].

```bash
yarn install
yarn run dev

# Deploy to production
yarn run build && netlify deploy --prod
```

## Environment variables

```bash
export GOO_ENDPOINT=https://goo.ogrodje.si
export HYGRAPH_ENDPOINT=<hygraph_endpoing>
export KEYCLOAK_URL="https://keycloak.ogrodje.si"
export KEYCLOAK_CLIENT_ID=<keycoak_client_id>
export KEYCLOAK_REALM="Ogrodje"
export SEARCH_ENDPOINT=https://search.ogrodje.si
```

## Notes

- In production, the site rebuilds daily (to refresh events) or when content changes (via Webhooks integration with our CMS (HyGraph))
- It is possible to trigger a rebuild manually from the GitHub Actions panel.
- The admin section is protected via our Keycloak setup.

## Author

- [Oto Brglez](https://github.com/otobrglez)

[astro-build]: https://astro.build/
[vuejs]: https://vuejs.org/
[Ogrodje]: https://ogrodje.si
