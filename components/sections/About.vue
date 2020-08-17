<template lang="pug">
.about
  .content
    section
      p かくれんぼ in ぐんまとは、読んで字の如く「かくれんぼ」を「群馬」でやろうという企画です。
    section
      p 誰しもが子供の頃に一度はかくれんぼで遊んだことがあると思います。
      p このかくれんぼが大人になった今でも楽しめるのだろうか？
      p そんな純粋な疑問からこの企画が立ち上がりました。
    section
      p 2020年8月、この疑問を解消すべく7名の大人たちが集まり実験が行われました。
      p 実験当日のギリギリまで「本当に楽しいのだろうか？」と疑心暗鬼でしたが、
      p いざやってみると、童心に帰ったような感覚で楽しむことができました。
    section
      p こんなに楽しいのであれば、県内に広めないことにはもったいないと考えています。
      p 最終的には群馬を「かくれんぼ県」と言わしめることが私達の野望です。
      p その第一歩として情報を発信すべくこのサイトを立ち上げました。
  .concepts.row
    .col-lg-1.col-sm-1.mb-lg-0.mb-5
      .person
        img(src="@/assets/images/seeker.svg")
    .offset-lg-2.offset-sm-3
    .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
      .person
        img(src="@/assets/images/hider1.svg")
      .catch
        | 大人も子供も楽しめる
    .offset-lg-0.offset-sm-4
    .offset-lg-0.offset-sm-2
    .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
      .person
        img(src="@/assets/images/hider2.svg")
      .catch
        | 運動不足を解消に
    .concept.col-lg-2.col-sm-4.mb-lg-0.mb-5
      .person
        img(src="@/assets/images/hider3.svg")
      .catch
        | 3密を避けて安全に
</template>

<style lang="sass" scoped>
.about
  text-align: center
  .content
    font-size: 14px
    letter-spacing: 2px
    line-height: 1.7
    margin-bottom: 80px
    section
      margin-bottom: 30px
      p
        margin-bottom: 5px
  .concepts
    .person
      margin-bottom: 10px
      img
        height: 180px
    .catch
      font-size: 16px
      font-weight: bold
@media screen and (max-width: 480px)
  .about
    .content
      text-align: left
      padding: 0 25px
</style>