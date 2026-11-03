# A minimal blog template

The user asked to debloat the blog template before the next release.

## Checklist

- [x] No Nuxt UI components in the site (icons stay, through `<Icon>`), no `@nuxt/ui`, `@plutocms/css`,
      `/base` or `/site` import. Tailwind stays. A small prose style for the post body.
- [x] No site i18n (`i18n/`, `LanguageSwitch`, `usePlutoSiteI18n`, `plutoI18n.siteLocale`): English
      text in the files, `<html lang="en">` from `app.head`. The site starts light (`colorMode`), with
      a light/dark switch (`ColorModeSwitch`, on Pluto's `useColorMode`).
- [x] The home page lists the posts in one column.
- [x] Pluto's favicon (`public/favicon.svg`), not Nuxt's `favicon.ico`.
- [x] `SiteNavbar` and `SiteFooter` components; the layout uses them.
- [x] A `typecheck` script (vue-tsc), and no type errors. No deprecated Nuxt API (`status`,
      `statusText`, not `statusCode`, `statusMessage`).
- [x] README and the docs (project structure) follow.
- [x] Live check of both pages, the 404 page and the post preview, in light and dark.
