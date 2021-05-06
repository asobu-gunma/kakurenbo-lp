<template lang="pug">
.concepts
  .container-fluid
    .row
      .col-lg-1.col-sm-1.mb-lg-0.mb-5
        .person
          img(src="@/assets/images/seeker.svg", alt="seeker")
      .offset-lg-2.offset-sm-3
      .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
        .person
          img(src="@/assets/images/hider1.svg", alt="hider1")
        .catch
          | 大人も子供も楽しめる
        .explain
          | 体力だけでなく隠れる上手さ、鬼を出し抜く戦略性を活かせるゲームを企画しています。
      .offset-lg-0.offset-sm-4
      .offset-lg-0.offset-sm-2
      .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
        .person
          img(src="@/assets/images/hider2.svg", alt="hider2")
        .catch
          | 運動不足の解消に
        .explain
          | じっと隠れているだけでは勝てない設計をしています。勝つためには走ることも重要です。
      .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
        .person
          img(src="@/assets/images/hider3.svg", alt="hider3")
        .catch
          | 3密を避けて安全に
        .explain
          | 屋外かつソーシャルディスタンスを保って遊べる、それがかくれんぼのいいところです。
</template>

<style lang="sass" scoped>
.concepts
  text-align: center
  .person
    margin-bottom: 10px
    img
      height: 180px
  .catch
    font-size: 16px
    font-weight: bold
    margin-bottom: 20px
  .explain
    letter-spacing: 1px
    line-height: 2
</style>