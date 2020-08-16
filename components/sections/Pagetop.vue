<template lang="pug">
.welcome
  #pageTop.page-top(v-lazy:background-image="topImage")
    .top-text
      .title I'M TOYOKAWA YUTA
      .subtitle Official Site
</template>

<script>
import topImage from "@/assets/images/pagetop.jpg";

export default {
  data() {
    return {
      topImage,
    };
  },
};
</script>

<style lang="sass" scoped>
.page-top
  position: relative
  width: 100%
  height: 100vh
  background-size: cover
  background-position: center center
  .top-text
    position: absolute
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    color: white
    font-family: $en-accent-family
    text-align: center
    width: 100%
    margin: auto
    @include media-breakpoint-up(sm)
      .title
        font-size: 60px
        font-weight: bold
        letter-spacing: 5px
      .subtitle
        font-size: 24px
        letter-spacing: 3px
    @include media-breakpoint-down(xs)
      .title
        font-size: 42px
        font-weight: bold
        letter-spacing: 5px
      .subtitle
        font-size: 16px
        letter-spacing: 3px
</style>