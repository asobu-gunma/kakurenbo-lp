<template lang="pug">
.rules
  .content
    .row
      .col-sm-6.offset-sm-3
        section
          p かくれんぼ in ぐんまの公式ルールの一部をご紹介します。
          p みなさんがご存知のかくれんぼをベースに作られており、誰でも簡単にお楽しみいただけます。
          p 是非、かくれんぼ in ぐんま公式ルールをご覧いただき、ご家族やお友達と楽しんでくださいませ。
        section
          h2 基本ルール
          ol
            li 鬼は1人、子（かくれる人）は7〜9人。鬼はじゃんけんやくじ引き等で決める。
            li かくれる時間は10秒。鬼は拠点の近くで目をつぶって10秒数える。
            li 10秒数え終わったら、鬼は子を探し始める。探索時間は5分間。
            li 鬼は拠点に触れた状態で「〇〇（名前、番号、色など）見つけ）」と宣言することで、子を確保することができる。確保された子は場外で待機する。
            li 子は鬼に見つかる前に拠点にタッチすることで、これまでに確保された子を開放することができる。開放後、鬼は改めて10秒数え、子はその間に隠れる。
            li 時間内に鬼が全員を確保するか、制限時間が0になったタイミングでゲームは終了となる。
        section
          h2 得点ルール
          ol
            li 鬼は子を見つけると+1点。
            li 子は拠点にタッチすると+3点。
            li 鬼は制限時間内に全員を見つけることができた場合、ボーナスポイントとして残り時間の分数 + 1点獲得できる。
            li ゲーム終了後に得点が一番多い人が勝利となる。
        section
          p なお、こちらで紹介したのは公式ルールの「一部」となります。
          p より詳しいルールをご覧になりたい方は、下記のボタンより公式ルールブックを御覧ください。
    .row.mt-4
      .offset-sm-3.col-sm-6
        a.entry-link(href="/rule_book.pdf" target="_blank" rel="noopener")
          strong 公式ルールブックをダウンロード
          fa.ml-2(:icon="faAngleDoubleRight")
</template>

<script>
import {
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      faAngleDoubleRight,
    };
  },
}
</script>


<style lang="sass" scoped>
.rules
  .content
    font-size: 14px
    letter-spacing: 2px
    line-height: 1.7
    section
      margin-bottom: 30px
      p
        margin-bottom: 5px
      h2
        font-size: 20px
        font-weight: bold
        margin-bottom: 10px
      ol
        padding-left: 24px
        li
          margin-bottom: 10px
    .entry-link
      color: black
      background-color: $accent-color
      font-family: $en-accent-family
      padding: 15px 20px
      border: 2px solid black
      &:hover
        color: white
        text-decoration: none
        background-color: black
      @include media-breakpoint-down(sm)
        .entry-link
          font-size: 18px
      @include media-breakpoint-down(xs)
        .entry-link
          font-size: 14px
@media screen and (max-width: 480px)
  .rules
    .content
      text-align: left
      padding: 0 25px
      p
        display: inline
</style>