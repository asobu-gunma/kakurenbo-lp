<template lang="pug">
.welcome(:class="{ fixed: $store.state.isFixed }")
  #pageTop.page-top(v-lazy:background-image="topImage")
    .logo
      svg-logo.img
    .subtitle 隠した童心、解き放て。
  parts-global-header
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
.fixed
  @include media-breakpoint-up(lg)
    margin-top: 100px
  @include media-breakpoint-down(md)
    margin-top: 50px
  .page-top::after
    display: none
.page-top
  position: relative
  width: 100%
  background-size: cover
  background-position: center center
  @include media-breakpoint-up(lg)
    height: calc(100vh - 100px)
  @include media-breakpoint-down(md)
    height: calc(100vh - 50px)
  &::after
    content: ""
    background: linear-gradient(45deg, #FFC32A 50%, transparent 52%), linear-gradient(315deg, #FFC32A 50%, transparent 52%)
    background-size: 25px
    width: 100%
    height: 25px
    position: absolute
    bottom: -10px
  .logo
    text-align: center
    padding-top: 25px
    .img
      width: 250px
  .subtitle
    position: absolute
    bottom: 100px
    left: 50%
    transform: translateX(-50%)
    color: white
    font-family: $ja-accent-family
    text-align: center
    width: 100%
    margin: auto
    @include media-breakpoint-up(sm)
      font-size: 24px
      letter-spacing: 3px
    @include media-breakpoint-down(xs)
      font-size: 16px
      letter-spacing: 3px
</style>