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
      { rel: 'icon', type: 'image/x-icon', href: '/favico.svg' },
      { rel: 'stylesheet', href: '/css/vendors/normalize.css' },
      { rel: 'stylesheet', href: '/css/vendors/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/vendors/fontawesome-all.min.css' },
      { rel: 'stylesheet', href: '/css/vendors/wowy-font.css' },
      { rel: 'stylesheet', href: '/css/plugins/jquery-ui.css' },
      { rel: 'stylesheet', href: '/css/plugins/magnific-popup.css' },
      { rel: 'stylesheet', href: '/css/plugins/animate.css' },
      { rel: 'stylesheet', href: '/css/plugins/select2.min.css' },
      { rel: 'stylesheet', href: '/css/plugins/slick.css' },
      { rel: 'stylesheet', href: '/css/plugins/perfect-scrollbar.css' },
      { rel: 'stylesheet', href: '/css/main.css' },
    ],
    script: [
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/jquery.js', mode: 'client' },
    { src: '~/plugins/vendor.js', mode: 'client' },
    { src: '~/plugins/slick.js', mode: 'client' },
    { src: '~/plugins/jquery.syotimer.min.js', mode: 'client' },
    { src: '~/plugins/wow.js', mode: 'client' },
    { src: '~/plugins/jquery-ui.js', mode: 'client' },
    { src: '~/plugins/select2.min.js', mode: 'client' },
    { src: '~/plugins/perfect-scrollbar.js', mode: 'client' },
    { src: '~/plugins/magnific-popup.js', mode: 'client' },
    { src: '~/plugins/waypoints.js', mode: 'client' },
    { src: '~/plugins/counterup.js', mode: 'client' },
    { src: '~/plugins/jquery.countdown.min.js', mode: 'client' },
    { src: '~/plugins/images-loaded.js', mode: 'client' },
    { src: '~/plugins/isotope.js', mode: 'client' },
    { src: '~/plugins/scrollup.js', mode: 'client' },
    { src: '~/plugins/jquery.vticker-min.js', mode: 'client' },
    { src: '~/plugins/vuex-persist.js', mode: 'client' },
    { src: '~/plugins/main.js', mode: 'client' },
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
