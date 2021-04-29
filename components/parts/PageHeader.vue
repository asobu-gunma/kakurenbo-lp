<template lang="pug">
header.navbar.navbar-expand-lg.header-nav
  nav.container
    n-link.navbar-brand(to="/")
      fa.mr-2(:icon="faAngleDoubleLeft")
      span.mr-2 Back to
      strong Kakurenbo's Site
</template>

<script>
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      faAngleDoubleLeft,
    };
  },
};
</script>

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