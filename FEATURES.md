# Features

This file lists every implemented feature of this project. See the workspace-level `CLAUDE.md`
(one directory up) for the writing and git policies shared by every project here.

- A blog on `@plutocms/pluto` in standalone mode: posts are Markdown files in this GitHub
  repository, edited in the admin at `/admin`, read at runtime by the public pages. See the
  README and the `github-cms` skill in `@plutocms/pluto`.
- Public pages: the post list (`app/pages/index.vue`) and the post page
  (`app/pages/posts/[slug].vue`), built on the public API of Pluto (`/api/pluto/v1/content/post`)
  with `usePlutoPublicList`, `usePlutoPublicItem` and `PlutoMarkdown`.
- Development storage: the local `content/` folder in `nuxt dev` (see `nuxt.config.ts`).
- Admin bar: "New Post" on every page, and "Edit Post" on the post page (`usePlutoEditLink`).
