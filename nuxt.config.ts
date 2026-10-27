import { plutoLayer } from "@plutocms/pluto/layers";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Set PLUTO_LOCAL_ROOT in .env to use local checkouts of the Pluto layers.
  // See "Develop with local layers" in README.md.
  extends: [plutoLayer("@plutocms/pluto")],

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
   * The GitHub CMS: posts are Markdown files in a GitHub repository, edited
   * in the admin at /admin. See "Set up the CMS" in README.md. The defaults
   * need no config here: files in the local `content/` folder in
   * development, GitHub in production, the repo from PLUTO_GITHUB_REPO (or the
   * git `origin` remote in development), the GitHub App from
   * PLUTO_GITHUB_APP_SLUG, and the `main` branch. Set `plutoGithub` to change them.
   */

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
