import { plutoLayer } from "@plutocms/pluto/layers";

export default defineNuxtConfig({
  extends: [plutoLayer("@plutocms/pluto")],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    public: {
      websiteName: "My Blog",
    },
  },

  plutoI18n: {
    siteLocale: "en",
  },

  eslint: false,
});
