
<template lang="pug">
n-link.event-button(
  v-if="event",
  v-lazy:background-image="event.fields.buttonImage.fields.file.url",
  v-scroll-to="'#event'",
  to
)
  .event-detail
    img.event-image(v-lazy="event.fields.image.fields.file.url")
    .event-text
      .event-date {{ eventButtonDate }}開催！
      .event-enter 詳細はコチラ！
</template>

<script>
import datetimeParserMixin from "@/components/mixins/datetimeParserMixin";

export default {
  mixins: [datetimeParserMixin],
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    eventButtonDate() {
      return this.parseEventButtonDate(this.event.fields.eventDate);
    },
  },
};
</script>

<style lang="sass" scoped>
.event-button
  position: fixed
  z-index: 100
  @include media-breakpoint-up(sm)
    background-size: cover
    background-position: center center
    border: 5px $accent-color solid
    border-radius: 50%
    overflow: hidden
    width: 150px
    height: 150px
    bottom: 40px
    right: 60px
  @include media-breakpoint-down(xs)
    display: block
    background-image: none !important
    background-color: $accent-color
    width: 100%
    padding: 5px
    bottom: 0
  .event-detail
    text-align: center
    @include media-breakpoint-up(sm)
      color: white
      font-size: 11px
      font-weight: bold
      width: 100%
      background-color: rgba(0, 0, 0, 0.7)
      padding: 7px 20px 15px
      position: absolute
      bottom: 0
      .event-image
        display: none
    @include media-breakpoint-down(xs)
      color: $primary-grey
      font-size: 16px
      font-weight: bold
      display: flex
      align-items: center
      .event-image
        height: 70px
        margin-right: 10px
      .event-text
        text-align: center
        width: 100%
        .event-date, .event-enter
          display: inline-block
</style>