module.exports = function () {
  this.nuxt.hook('build:extendRoutes', routes => {
    const blogPages = {
      path: '/blog/page/:page',
      component: 'pages/blog/index.vue',
      name: 'blogs-page'
    }
    routes.unshift(blogPages)
  })
}