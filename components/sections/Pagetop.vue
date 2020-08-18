<template lang="pug">
.welcome(:class="{ fixed: $store.state.isFixed }")
  #pageTop.page-top(v-lazy:background-image="topImage")
    .logo
      img(v-lazy="logo")
    .subtitle 笑顔で帰ろう！(めちゃめちゃ適当)
  g-header
</template>

<script>
import topImage from "@/assets/images/pagetop.jpg";
import logo from "@/assets/images/logo.svg";
import GHeader from "@/components/global/Header";

export default {
  components: {
    GHeader,
  },
  data() {
    return {
      topImage,
      logo,
    };
  },
};
</script>

<style lang="sass" scoped>
.fixed
  margin-top: 100px
  .page-top::after
    bottom: 0
.page-top
  position: relative
  width: 100%
  height: calc(100vh - 100px)
  background-size: cover
  background-position: center center
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
    img
      width: 250px
  .subtitle
    position: absolute
    bottom: 100px
    left: 50%
    transform: translateX(-50%)
    color: white
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