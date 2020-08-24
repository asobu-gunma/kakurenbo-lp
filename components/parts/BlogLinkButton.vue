<template lang="pug">
.blog-link-button
  .container
    n-link.blog-link(to="/blogs")
      span.mr-2 Go to
      strong Kakurenbo's Blog
      fa.ml-2(:icon="faAngleDoubleRight")
</template>

<script>
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      faAngleDoubleRight,
    };
  },
};
</script>

<style lang="sass" scoped>
.blog-link
  color: black
  font-family: $en-accent-family
  padding: 15px 20px
  border: 2px solid black
  &:hover
    color: white
    text-decoration: none
    background-color: black
  @include media-breakpoint-down(sm)
    .blog-link
      font-size: 18px
  @include media-breakpoint-down(xs)
    .blog-link
      font-size: 14px
</style>