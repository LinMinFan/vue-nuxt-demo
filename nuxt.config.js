const path = require('path');

export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue + nuxt 電商',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '@/static/imgs/theme/favico.svg' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/static/css/vendors/normalize.css',
    '@/static/css/vendors/bootstrap.min.css',
    '@/static/css/vendors/fontawesome-all.min.css',
    '@/static/css/vendors/wowy-font.css',
    '@/static/css/plugins/jquery-ui.css',
    '@/static/css/plugins/magnific-popup.css',
    '@/static/css/plugins/animate.css',
    '@/static/css/plugins/select2.min.css',
    '@/static/css/plugins/slick.css',
    '@/static/css/plugins/perfect-scrollbar.css',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.resolve.alias['@'] = path.resolve(__dirname);
      
    }
  }
}
