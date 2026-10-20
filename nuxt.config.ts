// Point PLUTO_PLUTO_PATH at a local checkout (e.g. `../pluto`) to test
// unpublished changes. Unset, it resolves to the published npm package.
const plutoLayer = process.env.PLUTO_PLUTO_PATH || "@plutocms/pluto";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [[plutoLayer, { install: true }]],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    public: {
      // The site name in the header and in the admin navbar.
      // Override it with NUXT_PUBLIC_WEBSITE_NAME.
      websiteName: "My Blog",
    },
  },

  /*
   * The Pluto CMS: posts are Markdown files in a GitHub repository, edited
   * in the admin at /admin. See "Set up the CMS" in README.md.
   */
  plutoCms: {
    enabled: true,

    // In development, posts are read from and written to the local
    // `content/` folder, so a dev server never writes to the real
    // repository. Set PLUTO_CMS_STORAGE=github to test against GitHub.
    storage:
      process.env.PLUTO_CMS_STORAGE === "github" ||
      process.env.NODE_ENV === "production"
        ? "github"
        : "fs",

    github: {
      // The repository that holds the posts, as "owner/name".
      repo: process.env.PLUTO_CMS_REPO,
      branch: process.env.PLUTO_CMS_BRANCH || "main",
      // The URL name of your GitHub App, for the "install the app" link.
      appSlug: process.env.PLUTO_CMS_APP_SLUG,
    },

    // The folder for posts in the repository: content/posts/<slug>.md
    dir: "content",
  },

  /*
   * The language of the public site before a visitor picks one. The admin
   * has its own language per user.
   */
  plutoI18n: {
    siteLocale: "en",
  },

  /*
   * Disable ESLint inherited from @plutocms/pluto.
   * You can enable it by deleting this line.
   */
  eslint: false,
});
