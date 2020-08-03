import logger from "connect-logger";

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
    serverMiddleware: [
    logger({ format: "%date %status %method %url (%time)" })
  ],
  generate: {
    routes: [
      '/portfolio',
      '/blog',
      '/about',
    ]
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      // { rel:  'apple-touch-icon',                         sizes:  '57x57',        href:  '/apple-icon-57x57.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '60x60',        href:  '/apple-icon-60x60.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '72x72',        href:  '/apple-icon-72x72.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '76x76',        href:  '/apple-icon-76x76.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '114x114',      href:  '/apple-icon-114x114.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '120x120',      href:  '/apple-icon-120x120.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '144x144',      href:  '/apple-icon-144x144.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '152x152',      href:  '/apple-icon-152x152.png' },
      // { rel:  'apple-touch-icon',                         sizes:  '180x180',      href:  '/apple-icon-180x180.png' },
      // { rel:  'icon',               type:  'image/png',   sizes:  '192x192',      href:  '/android-icon-192x192.png' },
      // { rel:  'icon',               type:  'image/png',   sizes:  '32x32',        href:  '/favicon-32x32.png' },
      // { rel:  'icon',               type:  'image/png',   sizes:  '96x96',        href:  '/favicon-96x96.png' },
      // { rel:  'icon',               type:  'image/png',   sizes:  '16x16',        href:  '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;900&display=swap' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vue-animejs.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
  ],
  proxy: {
    '/api/portfolio': 'https://api.behance.net/v2/users/asaldana/projects',
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   }
  // },
  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL
  //   }
  // },
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
