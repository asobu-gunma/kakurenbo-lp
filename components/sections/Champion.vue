<template lang="pug">
.champion
  .container
    .row
      .col-lg-3.col-sm-4.mb-5
        .photo
        .title-area
          .title
            span 第
            span.num 1
            span 回
        .name 鈴木 舞南
        .nickname まいまい
      .col-lg-3.col-sm-4.mb-5
        .photo
        .title-area
          .title
            span 第
            span.num 0
            span 回
        .name 中村 昌嗣
        .nickname なかちゃん
</template>

<style lang="sass" scoped>
.champion
  .photo
    width: 100%
    padding-bottom: 150%
    background-size: cover
    background-position: center center
    background-color: $secondary-grey
    border-radius: 5px
  .title-area
    display: flex
    justify-content: center
    align-items: center
    width: 75px
    height: 75px
    background-color: white
    border-radius: 50%
    margin: -20px auto 0
    .title
      letter-spacing: 2px
      font-weight: bold
      .num
        font-size: 28px
  .name
    text-align: center
    font-size: 24px
    font-weight: bold
  .nickname
    text-align: center
    color: $secondary-grey
</style>