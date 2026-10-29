# Features

This file lists every implemented feature of this project. See the workspace-level `CLAUDE.md`
(one directory up) for the writing and git policies shared by every project here.

- A blog on `@plutocms/pluto` in standalone mode: posts are Markdown files in this GitHub
  repository, edited in the admin at `/admin`, read at runtime by the public pages. See the
  README and the `github-cms` skill in `@plutocms/pluto`.
- The Pluto look: the Pluto palette in `app/app.config.ts` (tholin, haze, kuiper) and the opt-in
  site theme of core (`#build/pluto-site.css`: Public Sans and Fredoka, the deep-space dark mode,
  `pluto-sky`, `pluto-site-header`).
- Home page (`app/pages/index.vue`): a hero with the site name and a search field, the published
  posts as cards (`PostCard.vue`), newest first, with pages (`UPagination`). The search and the
  page are in the URL (`?q=`, `?page=`). Built on `usePlutoPublicList` (`search`, `sort`,
  `limit`, `offset`, `meta.total`).
- Post page (`app/pages/posts/[slug].vue`): `PostArticle.vue` (the date, the reading time, the
  title, the excerpt and the body with `PlutoMarkdown`), SEO meta from the title and the excerpt,
  a 404 for a draft or a missing post. Built on `usePlutoPublicItem`.
- Post editor preview: `PlutoPostPreview.vue` renders `PostArticle.vue`, so the preview in the
  admin matches the post page.
- Site languages: `i18n/locales/en.json` and `pt-BR.json` (`site.*`), `usePlutoSiteI18n`, and
  a language switch in the header (`LanguageSwitch.vue`) when there is more than one language.
- Header and footer (`app/layouts/default.vue`): the logo and the site name, the language switch,
  the color mode button; "Built with Pluto". The sticky header moves below the admin bar.
- Error page (`app/error.vue`): a 404 and a server error, in the site layout.
- Development storage: the local `content/` folder in `nuxt dev` (see `nuxt.config.ts`).
- Admin bar: "New Post" on every page, and "Edit Post" on the post page (`usePlutoEditLink`).
