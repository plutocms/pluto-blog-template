# Pluto Core Blog Template

A blog with no database. Posts are Markdown files in this GitHub repository. You write them in
the Pluto admin at `/admin`, and each save is a commit. The site reads the posts from GitHub at
runtime, so a save publishes in seconds, with no new build.

Built on [`@plutocms/pluto`](https://github.com/plutocms/pluto) (standalone mode).

## Create a blog

```bash
bunx create-pluto@latest my-blog -t core-blog
# or
pnpm dlx create-pluto@latest my-blog -t core-blog
```

Then push the new project to a GitHub repository of your own.

## Try it locally

```bash
bun install
bun run dev
```

In development, posts are read from and written to the local `content/posts` folder, so a dev
server never writes to the real repository. Open `http://localhost:3000/admin`: on this machine
you are signed in as a local user. Write a post, save it, and look at the new `.md` file.

## Set up the CMS

Editors sign in with GitHub. Users with push access to the repository can write posts. You need
a GitHub App once per site.

1. **Create the GitHub App.** Open *Settings → Developer settings → GitHub Apps → New GitHub
   App* (for an organization: *Organization settings → GitHub Apps*).
   - **Homepage URL:** the URL of your site.
   - **Callback URL:** `https://<your-site>/api/_pluto/auth/github/callback`. Add
     `http://localhost:3000/api/_pluto/auth/github/callback` too if you want to test sign-in
     locally.
   - **Expire user authorization tokens:** on.
   - **Webhook → Active:** off.
   - **Repository permissions:** *Contents: Read and write*, *Metadata: Read-only*. Nothing
     else.
2. **Collect the credentials.** On the App page, note the *App ID* and the *Client ID*. Generate
   a *client secret* and a *private key* (a `.pem` file). The App URL name
   (`github.com/apps/<slug>`) is the *app slug*.
3. **Install the App** on the repository of this blog only.
4. **Set the environment variables** (copy `.env.example` to `.env` for local use, and set them
   in your host for production):

   | Variable | Value |
   | --- | --- |
   | `PLUTO_CMS_REPO` | `owner/name` of this repository |
   | `PLUTO_CMS_APP_SLUG` | the app slug |
   | `NUXT_PLUTO_CMS_SESSION_PASSWORD` | 32 characters or more (`openssl rand -base64 32`) |
   | `NUXT_PLUTO_CMS_GITHUB_APP_ID` | the App ID |
   | `NUXT_PLUTO_CMS_GITHUB_CLIENT_ID` | the Client ID |
   | `NUXT_PLUTO_CMS_GITHUB_CLIENT_SECRET` | the client secret |
   | `NUXT_PLUTO_CMS_GITHUB_PRIVATE_KEY` | the private key, on one line with `\n` for line breaks |
   | `NUXT_PLUTO_CMS_ALLOWED_USERS` | optional: only these GitHub logins can sign in |

5. **Deploy** to a host with a server runtime (Vercel, Netlify, or Node). The site reads the
   posts at runtime, so a static export does not work.

Content commits end with `[skip ci]`, so a host that honors it does not rebuild on each save.

## Write the public pages

```vue
<script setup lang="ts">
const { data } = await usePlutoCmsList("post", { limit: 20 });
</script>

<template>
  <NuxtLink v-for="post in data?.data" :key="post.id" :to="`/posts/${post.id}`">
    {{ post.title }}
  </NuxtLink>
</template>
```

```vue
<script setup lang="ts">
const route = useRoute();
const { data: post } = await usePlutoCmsItem("post", String(route.params.slug));
</script>

<template>
  <PlutoMarkdown v-if="post" :html="post.html" />
</template>
```

`usePlutoCmsList` and `usePlutoCmsItem` return published posts only. `PlutoMarkdown` shows the
post body as sanitized HTML.

## Drafts in a public repository

A draft is a file with `status: draft`. The site never shows it, but anyone can read it on
GitHub when the repository is public. Use a private repository if your drafts must stay private.

## Styling

This app owns the only Tailwind build. Keep these three imports at the start of
`app/assets/css/tailwind.css`, and add your own theme after them:

```css
@import 'tailwindcss';
@import '@nuxt/ui';
@import '#build/pluto.css';
```
