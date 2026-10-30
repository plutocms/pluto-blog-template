# Pluto Blog Template

A blog on [Pluto](https://pluto.vulmix.dev), with one of two backends:

- **GitHub CMS:** no database. Posts are Markdown files in this repository, and each save in the
  admin is a commit. The template extends [`@plutocms/core`](https://github.com/plutocms/pluto).
- **Supabase:** posts in your Supabase database, with image uploads. The template extends
  [`@plutocms/supabase-blog`](https://github.com/plutocms/supabase-blog).

The pages are the same for both backends.

## Create a blog

```bash
npm create pluto@latest my-blog -t blog --backend github
npm create pluto@latest my-blog -t blog --backend supabase
```

The CLI sets the backend: the layer in `nuxt.config.ts`, the packages, the sample posts in
`content/` (GitHub CMS only) and the `.env`.

## Run it

```bash
npm run dev
```

Then open `/admin` on the dev server.

- **GitHub CMS:** in development you are signed in as a local user, and the posts are the files
  in `content/posts`. It works out of the box with local Git: each save in the admin is a commit
  in the local repository of the project (run `git init` first if the project is not a Git
  repository yet). Push when you are ready. Local Git publishing works in development only. A
  deployed site publishes through GitHub (see below). Support for other Git providers is planned.
- **Supabase:** the first visit to `/admin` opens the setup wizard of the Supabase layer.
  `npm run supabase-types` writes the database types.

## Make it yours

The site is small on purpose. Every file is a starting point:

| File                             | What it does                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/app.config.ts`              | The colors (`primary`, `secondary`, `neutral`). Pluto's palette is the default.                                                                                |
| `app/assets/css/tailwind.css`    | The CSS entry. `#build/pluto-site.css` adds the Pluto look: the fonts, the dark mode and the `pluto-sky` background. Remove that line for a theme of your own. |
| `app/layouts/default.vue`        | The header (your logo and the site name) and the footer.                                                                                                       |
| `app/pages/index.vue`            | The home page: the posts, with search and pages.                                                                                                               |
| `app/components/PostArticle.vue` | One post. The post page and the preview of the post editor both use it, so the preview always looks like the site.                                             |
| `i18n/locales/*.json`            | The texts of the site (`site.*`), one file per language.                                                                                                       |

The site name comes from `websiteName` in `nuxt.config.ts` (or `NUXT_PUBLIC_WEBSITE_NAME`).

### Languages

The site has its own language, separate from the admin language. The language switch in the
header shows when there is more than one file in `i18n/locales/`. Use `usePlutoSiteI18n()` in a
page: `t('site.…')` for text and `d(date, options)` for dates. `plutoI18n.siteLocale` in
`nuxt.config.ts` sets the language before a visitor picks one.

## Go live

Push the project to a GitHub repository and deploy it (for example to Vercel). Then:

- **GitHub CMS:** open `/admin/login` on the deployed site and select **Create the GitHub App**.
  The page guides you through the rest.
- **Supabase:** set the values of your `.env` (`SUPABASE_URL`, `SUPABASE_KEY`, `DATABASE_URL`) in
  the settings of your host.

**Docs:** [GitHub CMS in 10 minutes](https://pluto.vulmix.dev/github-cms/quickstart) ·
[Supabase](https://pluto.vulmix.dev/supabase) · [Blog layer](https://pluto.vulmix.dev/layers/blog)

## License

MIT
