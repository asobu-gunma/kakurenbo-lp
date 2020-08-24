<template lang="pug">
.event
  .container(v-if="event")
    .row
      .offset-lg-1.col-lg-10
        .event-image(
          v-lazy:backgroundImage="event.fields.image.fields.file.url"
        )
        .event-title {{ event.fields.title }}
        .event-description(v-html="parseDescription(event.fields.description)")
        .event-date
          .label
            fa.mr-2(:icon="faCalendarAlt")
            span 開催日時
          .item
            span.value {{ eventDateArray[0] }}
            span.unit 年
            span.value {{ eventDateArray[1] }}
            span.unit 月
            span.value {{ eventDateArray[2] }}
            span.unit.mr-2 日({{ eventDateArray[3] }})
            span.value {{ eventDateArray[4] }}
            span.unit 開始
        .event-location
          .label
            fa.mr-2(:icon="faMapMarkerAlt")
            span 開催場所
          .item
            .value {{ event.fields.location }}
        .event-fee
          .label
            fa.mr-2(:icon="faYenSign")
            span 参加費
          .item
            span.value {{ event.fields.fee.toLocaleString() }}
            span.unit 円(税込)
        .event-submit
          a.submit-button(:href="event.fields.eventUrl", target="new") 詳細を見る
  .container(v-else)
    .preparing 準備中です。しばしお待ち下さい。
</template> 

<script>
import datetimeParserMixin from "@/components/mixins/datetimeParserMixin";
import descriptionParserMixin from "@/components/mixins/descriptionParserMixin";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";

export default {
  mixins: [datetimeParserMixin, descriptionParserMixin],
  data() {
    return {
      faCalendarAlt,
      faMapMarkerAlt,
      faYenSign,
    };
  },
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    eventDateArray() {
      return this.parseDatetimeArray(this.event.fields.eventDate);
    },
  },
};
</script>

<style lang="sass" scoped>
.event
  .event-image
    width: 100%
    padding-bottom: 60%
    background-size: cover
    background-position: center center
    margin-bottom: 5px
  .event-title
    font-family: $ja-accent-family
    margin-bottom: 5px
  .event-description
    margin-bottom: 30px
  @include media-breakpoint-up(sm)
    .event-title
      font-size: 28px
    .event-description
      font-size: 16px
  @include media-breakpoint-down(xs)
    .event-title
      font-size: 20px
    .event-description
      font-size: 14px
  .event-date, .event-location, .event-fee
    margin-bottom: 30px
    .label
      color: $primary-grey
      font-size: 20px
      font-weight: bold
      margin-bottom: 8px
    .item
      font-weight: bold
      .value
        font-size: 22px
      .unit
        font-size: 14px
    .excuse
      color: $primary-grey
      font-size: 14px
  .event-submit
    text-align: center
    margin-top: 50px
    .submit-button
      display: inline-block
      color: $primary-grey
      font-size: 24px
      font-weight: bold
      background-color: $accent-color
      padding: 12px 30px
      border: 3px solid $accent-color
      border-radius: 5px
      cursor: pointer
      transition: 0.3s
      &:hover
        opacity: 0.7
        text-decoration: none
  .preparing
    text-align: center
    font-size: 20px
    font-weight: bold
</style>