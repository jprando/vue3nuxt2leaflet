import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/",
    cdnURL: "https://jprando.github.io/vue3nuxt3leaflet",
  },
});
