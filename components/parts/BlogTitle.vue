<template lang="pug">
.section-header
  .section-title
    n-link(to="/blog") かくれんぼ日記
  h1.section-subtitle Kakurenbo in Gunma Official Blog
  .section-description 最新のチャレンジや動向をコンテンツとしてお届け
</template>

<style lang="sass" scoped>
.section-header
  text-align: center
  padding-top: 80px
  padding-bottom: 150px
  a
    color: inherit
    text-decoration: none
  .section-title
    font-family: $ja-accent-family
    letter-spacing: 5px
    margin-bottom: 0
  .section-subtitle
    font-family: $en-accent-family
    font-weight: normal
    letter-spacing: 4px
    margin-bottom: 30px
  .section-description
    color: $secondary-grey
    font-weight: normal
    letter-spacing: 3px
  @include media-breakpoint-up(sm)
    .section-title
      font-size: 40px
    .section-subtitle
      font-size: 20px
    .section-description
      font-size: 16px
  @include media-breakpoint-down(xs)
    .section-title
      font-size: 28px
    .section-subtitle
      font-size: 12px
    .section-description
      font-size: 14px
      padding: 0 10px
</style>