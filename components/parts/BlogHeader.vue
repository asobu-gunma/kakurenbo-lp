<template lang="pug">
header.navbar.navbar-expand-lg.header-nav
  nav.container
    n-link.navbar-brand(to="/")
      i.fas.fa-angle-double-left.mr-2
      span.mr-2 Back to
      strong Kakurenbo's Site
</template>

<style lang="sass" scoped>
.header-nav
  font-family: $en-accent-family
  background-color: $accent-color
  a.navbar-brand
    color: $primary-grey
  @include media-breakpoint-down(xs)
    .navbar-brand
      font-size: 12px
</style>