import path from 'path';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Marchen',
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'copyright',
        name: 'copyright',
        content: 'Marchen',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        name: 'google-site-verification',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-web.png' }
    ],
    htmlAttrs: {
      lang: 'vi',
    },
  },

  ssr: false,

  srcDir: path.resolve(__dirname, 'src'),

  render: {
    http2: {
        push: true,
    },
  },

  server: {
    port: 8000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/nuxt-client-init', // Enable if use client side render
    '@/plugins/mixins/notifycation', // Enable if use client side render
    { src: '~plugins/vs-pagination', mode: 'client', ssr: false },
    { src: '~plugins/vue-toastification', mode: 'client', ssr: false },
    { src: '~plugins/vue-carousel', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/robots',
    // '@nuxtjs/sitemap',
    'cookie-universal-nuxt',
    '@nuxtjs/dayjs',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
        plugins: {
            tailwindcss: path.resolve(__dirname, './src/tailwind.config.js'),
        },
    },

    optimization: {
      minimize: true,
        splitChunks: {
          cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.(css|vue)$/,
                chunks: 'all',
                enforce: true,
            },
        },

        },
    },
    extractCSS: {
      ignoreOrder: true,
    },
  },

  axios: {
    proxy: true
  },

  robots: {
    /* module options */
    UserAgent: '*',
    Disallow: ['/admin', '/admin/**']
  },

  sitemap: {
    hostname: 'http://marchen.vn/',
    exclude: [
      '/admin/**',
      '/admin',
    ],
    cacheTime: 1000 * 60 * 60 * 24, // 1 day.
  },



  env: {
    BROWSER_API_URL: process.env.BROWSER_API_URL,
  },

  loading: {
    color: '#409eFF',
    height: '5px',
  },
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  }
}
