
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
  width: 150px
  height: 150px
  background-size: cover
  background-position: center center
  border: 5px $accent-color solid
  border-radius: 50%
  position: fixed
  bottom: 40px
  right: 60px
  overflow: hidden
  z-index: 100
  .event-detail
    color: white
    font-size: 11px
    font-weight: bold
    text-align: center
    width: 100%
    background-color: rgba(0, 0, 0, 0.7)
    padding: 7px 20px 15px
    position: absolute
    bottom: 0
</style>