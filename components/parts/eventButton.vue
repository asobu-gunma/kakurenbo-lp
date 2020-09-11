
<template lang="pug">
n-link.event-button(
  v-if="event",
  v-lazy:background-image="event.fields.buttonImage.fields.file.url",
  v-scroll-to="'#event'",
  to
)
  .event-detail
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
  background-size: cover
  background-position: center center
  border: 5px $accent-color solid
  border-radius: 50%
  position: fixed
  overflow: hidden
  z-index: 100
  @include media-breakpoint-up(sm)
    width: 150px
    height: 150px
    bottom: 40px
    right: 60px
  @include media-breakpoint-down(xs)
    display: none
    width: 80px
    height: 80px
    bottom: 30px
    right: 30px
  .event-detail
    @include media-breakpoint-up(sm)
      color: white
      font-size: 11px
      font-weight: bold
      text-align: center
      width: 100%
      background-color: rgba(0, 0, 0, 0.7)
      padding: 7px 20px 15px
      position: absolute
      bottom: 0
    @include media-breakpoint-down(xs)
</style>