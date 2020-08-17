<template lang="pug">
header.navbar.navbar-expand-lg.navbar-light.bg-light.header-nav
  nav.container
    n-link.navbar-brand(to="/")
      i.fas.fa-angle-double-left.mr-2
      span.mr-2 Back to
      strong Kakurenbo's Site
</template>

<style lang="sass" scoped>
.header-nav
  font-family: $en-accent-family
  @include media-breakpoint-down(xs)
    .navbar-brand
      font-size: 12px
</style>