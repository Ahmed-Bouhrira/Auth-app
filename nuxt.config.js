let obj1 = require("vuetify/es5/util/colors");
let colors = obj1.default;
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
  },

  head: {
    script: [],
    titleTemplate: "%s - project",
    title: "project",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: [],

  plugins: [
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/vuetify.js" }
  ],

  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  pwa: {
    manifest: {
      name: "Nuxt.js PWA nuxt-chat-app",
      short_name: "Nuxt.js PWA",
      start_url: "/",
      theme_color: "#424242",
      display: "standalone"
    },
    icon: {
      iconSrc: "./static/favicon.ico"
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
