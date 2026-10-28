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

The post editor has a Markdown mode with a preview of the site. The preview uses
`app/components/PlutoPostPreview.vue`, which copies the layout of `app/pages/posts/[slug].vue`.
When you change the post page, change the preview too.

## Go live

1. Push the project to a GitHub repository and deploy it (for example to Vercel).
2. Open `/admin/login` on the deployed site and select **Create the GitHub App**. The page guides
   you through the rest.

**Docs:** [GitHub CMS in 10 minutes](https://pluto.vulmix.dev/github-cms/quickstart) ·
[Public pages](https://pluto.vulmix.dev/github-cms/public-read)

## License

MIT
