const host = "kakurenbo.club"
const domain = `www.${host}`
const projectName = "かくれんぼ in ぐんま"
const pageTitle = `${projectName} | 公式サイト`
const description =
  "群馬県でかくれんぼの楽しさを広めるために活動している団体の公式サイト。老若男女誰でも楽しめる、そんなかくれんぼのイベント情報を発信しています。";
const pageLimit = 10

const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})

const fetchBlogRes = async () => {
  return await client.getEntries({
    content_type: 'blog',
    order: '-sys.createdAt'
  })
}

const fetchEventRes = async () => {
  return await client.getEntries({
    content_type: 'event',
    order: 'sys.createdAt'
  })
}

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
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
    htmlAttrs: {
      lang: 'ja'
    },
    title: pageTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Sawarabi+Mincho&display=swap' },
      { rel: 'canonical', href: `https://${domain}` },
    ]
  },
  env: {
    ctfSpaceId: process.env.CTF_SPACE_ID,
    ctfCdaAccessToken: process.env.CTF_CDA_ACCESS_TOKEN,
    mailgunKey: process.env.MAILGUN_KEY,
    mailTo: process.env.MAIL_TO,
    host,
    domain,
    projectName,
    pageTitle,
    description,
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
    { src: '~/plugins/lazyLoad.js' },
    { src: '~/plugins/mailgun.js' },
    { src: '~/plugins/markdownit.js' },
    { src: '~/plugins/veeValidate.js' },
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
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-gtag',
    ['vue-scrollto/nuxt', { duration: 500, offset: -50 }],
    'nuxt-compress',
    'nuxt-fontawesome',
    '@/modules/paging.js',
    '@nuxtjs/redirect-module',
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
  redirect: [
    {
      from: '^(\\/[^\\?]*[^\\/])(\\?.*)?$',
      to: '$1/$2',
      statusCode: 301
    }
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    hardSource: false,
    transpile: [
      'vee-validate/dist/rules',
    ],
    babel: {
      presets({ isServer }, [preset, options]) {
        options.loose = true
      },
    },
  },
  generate: {
    async routes() {
      const blogRes = await fetchBlogRes()
      const eventRes = await fetchEventRes()
      const totalPages = Math.ceil(blogRes.total / pageLimit);
      const pageRange = [...Array(totalPages).keys()]
      let urls = pageRange.map(pageNum => ({
        route: `/blog/page/${pageNum + 1}/`
      }))
      urls = urls.concat(blogRes.items.map(item => ({
        route: `/blog/${item.fields.slug}/`,
        payload: item
      })))
      urls = urls.concat(eventRes.items.map(item => ({
        route: `/event/${item.fields.slug}/`,
        payload: item
      })))
      return urls
    }
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: `https://${domain}`,
    gzip: true,
    trailingSlash: true,
  },
  robots: {
    UserAgent: '*',
    // クローリングしないパスを記述
    // sitemap.xmlのURLを記述
    Sitemap: `https://${domain}/sitemap.xml`,
  },
  fontawesome: {
    component: 'fa'
  },
  'google-gtag': {
    id: 'G-ZKC3660QET'
  },
  router: {
    trailingSlash: true
  },
}
