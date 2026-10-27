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

Open `http://localhost:3000/admin`. In development you are signed in as a local user, and the
posts are the files in `content/posts`.

## Go live

1. Push the project to a GitHub repository and deploy it (for example to Vercel).
2. Open `/admin/login` on the deployed site and select **Create the GitHub App**. The page guides
   you through the rest.

**Docs:** [GitHub CMS in 10 minutes](https://pluto.vulmix.dev/github-cms/quickstart) ·
[Public pages](https://pluto.vulmix.dev/github-cms/public-read)

## License

MIT
