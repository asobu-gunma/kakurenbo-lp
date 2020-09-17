const pageLimit = 10

const fetchBlogRes = async () => {
  const contentful = require('contentful')
  const client = contentful.createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  })
  const blogRes = await client.getEntries({
    content_type: 'blog',
    order: '-sys.createdAt'
  })
  return blogRes
}

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: 'かくれんぼ,群馬,かくれんぼ in ぐんま,グンマ' },
      { property: 'fb:app_id', content: '328198145005843' },
      { name: 'msapplication-TileColor', content: '#00aba9' },
      { name: 'theme-color', content: '#1f2233' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: 'safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700%7cOpen+Sans:100,200,300,400,700' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Sawarabi+Mincho' }
    ]
  },
  env: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessageingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    ctfSpaceId: process.env.CTF_SPACE_ID,
    ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    pageLimit,
  },
  loading: '@/components/modules/Loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'ress',
    'github-markdown-css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/burgerButton.js', ssr: false },
    { src: '~/plugins/contentful.js' },
    { src: '~/plugins/dateFormat.js' },
    { src: '~/plugins/firebaseFunctions.js' },
    { src: '~/plugins/lazyLoad.js' },
    { src: '~/plugins/markdownit.js' },
    { src: '~/plugins/youtube.js' },
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-100430187-8'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    ['vue-scrollto/nuxt', { duration: 500, offset: -50 }],
    'nuxt-compress',
    'nuxt-fontawesome',
    '@/modules/paging.js'
  ],
  styleResources: {
    sass: [
      '@/assets/sass/constants.sass',
      '@/assets/sass/plugins.sass'
    ]
  },
  toast: {
    position: 'bottom-center',
    action: {
      text: '閉じる',
      onClick(_e, toastObject) {
        toastObject.goAway(0)
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    hardSource: true,
  },
  generate: {
    async routes() {
      const blogRes = await fetchBlogRes()
      const totalPages = Math.ceil(blogRes.total / pageLimit);
      const pageRange = [...Array(totalPages).keys()]
      let urls = pageRange.map(pageNum => ({
        route: `/blogs/page/${pageNum + 1}`
      }))
      urls = urls.concat(blogRes.items.map(item => ({
        route: `/blogs/${item.fields.slug}`,
        payload: item
      })))
      return urls
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://kakurenbo.club',
    gzip: true
  },
  robots: {
    UserAgent: '*',
    // クローリングしないパスを記述
    Disallow: '/_nuxt',
    // sitemap.xmlのURLを記述
    Sitemap: 'https://example.com/sitemap.xml',
  },
  fontawesome: {
    component: 'fa'
  },
}
