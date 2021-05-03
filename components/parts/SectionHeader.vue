<template lang="pug">
.section-header
  .section-logo
    img(v-lazy="logo")
  h1.section-title(v-if="isMainSection", :style="`color: ${titleColor};`") {{ title }}
  h2.section-title(v-else, :style="`color: ${titleColor};`") {{ title }}
  .section-subtitle(:style="`color: ${subtitleColor};`") {{ subtitle }}
  .section-description {{ description }}
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    titleColor: {
      type: String,
      default: "black",
    },
    subtitleColor: {
      type: String,
      default: "black",
    },
    isMainSection: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.section-header
  text-align: center
  margin-top: 50px
  padding-top: 50px
  padding-bottom: 80px
  .section-logo
    margin-bottom: 20px
  .section-title
    font-family: $ja-accent-family
    letter-spacing: 5px
    line-height: 1.5
    margin-bottom: 0
  .section-subtitle
    font-family: $en-accent-family
    font-weight: normal
    letter-spacing: 4px
    line-height: 1.5
    margin-bottom: 30px
  .section-description
    color: $secondary-grey
    font-size: 16px
    font-weight: normal
    letter-spacing: 3px
  @include media-breakpoint-up(sm)
    .section-logo
      img
        width: 80px
    .section-title
      font-size: 40px
    .section-subtitle
      font-size: 20px
    .section-description
      font-size: 16px
  @include media-breakpoint-down(xs)
    .section-logo
      img
        width: 60px
    .section-title
      font-size: 30px
    .section-subtitle
      font-size: 16px
    .section-description
      font-size: 14px
      padding: 0 10px
</style>