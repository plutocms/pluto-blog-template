# Pluto Core Blog Template

A blog with no database. Posts are Markdown files in this repository. You write them in the
Pluto admin at `/admin`, and each save is a commit.

Built on [`@plutocms/pluto`](https://github.com/plutocms/pluto).

## Create a blog

```bash
npm create pluto@latest my-blog -t core-blog
```

## Run it

```bash
npm run dev
```

Open `/admin` on the dev server. In development you are signed in as a local user, and the posts
are the files in `content/posts`. It works out of the box with local Git: each save in the admin is
a commit in the local repository of the project (run `git init` first if the project is not a Git
repository yet). Push when you are ready.

Local Git publishing works in development only. A deployed site publishes through GitHub (see
below). Support for other Git providers is planned.

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

1. Push the project to a GitHub repository and deploy it (for example to Vercel).
2. Open `/admin/login` on the deployed site and select **Create the GitHub App**. The page guides
   you through the rest.

**Docs:** [GitHub CMS in 10 minutes](https://pluto.vulmix.dev/github-cms/quickstart) ·
[Public pages](https://pluto.vulmix.dev/github-cms/public-read)

## License

MIT
