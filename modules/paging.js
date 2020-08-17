module.exports = function () {
  this.nuxt.hook('build:extendRoutes', routes => {
    const blogPages = {
      path: '/blogs/page/:page',
      component: 'pages/blogs/index.vue',
      name: 'blogs-page'
    }
    routes.unshift(blogPages)
  })
}