# Pluto Blog Template

A blog on [Pluto](https://pluto.vulmix.dev), with one of two backends:

- **Git CMS:** no database. Posts are Markdown files in this repository, and each save in the
  admin is a commit. The template extends [`@plutocms/core`](https://github.com/plutocms/pluto).
- **Supabase:** posts in your Supabase database, with image uploads. The template extends
  [`@plutocms/supabase-blog`](https://github.com/plutocms/supabase-blog).

The pages are the same for both backends.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fplutocms%2Fpluto-blog-template&project-name=my-blog&repository-name=my-blog)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/plutocms/pluto-blog-template)

A button copies this template to a new repository in your GitHub account, with the Git CMS, and
deploys it. Then open `/admin/login` on the new site and select **Create the GitHub App**. For
the Supabase backend, or to start on your computer, use the CLI below.

## Create a blog

```bash
npm create pluto@latest my-blog -t blog --backend git
npm create pluto@latest my-blog -t blog --backend supabase
```

The CLI sets the backend: the layer in `nuxt.config.ts`, the packages, the sample posts in
`content/` (Git CMS only) and the `.env`.

## Run it

```bash
npm run dev
```

Then open `/admin` on the dev server.

- **Git CMS:** in development you are signed in as a local user, and the posts are the files
  in `content/posts`. It works out of the box with local Git: each save in the admin is a commit
  in the local repository of the project (run `git init` first if the project is not a Git
  repository yet). Push when you are ready. Local Git publishing works in development only. A
  deployed site publishes through GitHub (see below). Support for other Git providers is planned.
- **Supabase:** the first visit to `/admin` opens the setup wizard of the Supabase layer.
  `npm run supabase-types` writes the database types.

## Make it yours

The site is small on purpose: Tailwind CSS, a few components, and no UI library. Every file is a
starting point:

| File                             | What it does                                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `app/assets/css/tailwind.css`    | The look: the font, the colors (light and dark), and the post body (`.pluto-prose`).                        |
| `app/components/SiteNavbar.vue`  | The header: your logo, the site name and the light/dark switch (`ColorModeSwitch.vue`).                     |
| `app/components/SiteFooter.vue`  | The footer.                                                                                                 |
| `app/pages/index.vue`            | The home page: the list of posts (`PostListItem.vue`), with search and pages.                               |
| `app/components/PostArticle.vue` | One post. The post page and the preview of the post editor both use it, so the preview looks like the site. |
| `public/favicon.svg`             | The icon of the site.                                                                                       |

The site name comes from `websiteName` in `nuxt.config.ts` (or `NUXT_PUBLIC_WEBSITE_NAME`). The site
starts in light mode (`colorMode.preference` in `nuxt.config.ts`). The texts are in English, in the
files. For a site in more than one language, see
[Internationalization](https://pluto.vulmix.dev/docs/build/i18n).

## Go live

Push the project to a GitHub repository and deploy it (for example to Vercel). With the Git CMS,
**Settings → Deploy** in the admin links to each host and sets up GitHub Pages. Then:

- **Git CMS:** open `/admin/login` on the deployed site and select **Create the GitHub App**.
  The page guides you through the rest.
- **Supabase:** set the values of your `.env` (`SUPABASE_URL`, `SUPABASE_KEY`, `DATABASE_URL`) in
  the settings of your host.

**Docs:** [Deploy](https://pluto.vulmix.dev/docs/start-here/deploy) ·
[Supabase](https://pluto.vulmix.dev/docs/supabase) · [Blog layer](https://pluto.vulmix.dev/docs/layers/blog)

## License

MIT
