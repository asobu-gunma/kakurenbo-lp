<template lang="pug">
.event
  .container(v-if="event")
    .row
      .offset-lg-1.col-lg-10
        .event-video(v-if="event.fields.youtube")
          youtube(
            :video-id="event.fields.youtube",
            :fitParent="true",
            :resize="true"
          )
        .event-image(
          v-else,
          v-lazy:backgroundImage="event.fields.image.fields.file.url"
        )
        .event-title {{ event.fields.title }}
        .event-description(v-html="parseDescription(event.fields.description)")
    .row
      .offset-lg-1.col-lg-5.col-sm-6
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
          .item(v-if="event.fields.address")
            .unit {{ event.fields.address }}
          .excuse ※ 運営の都合により場所が変更になる場合もございます。
        .event-fee
          .label
            fa.mr-2(:icon="faYenSign")
            span 参加費
          .item
            span 大人（高校生以上）
            span.value {{ event.fields.fee.toLocaleString() }}
            span.unit 円(税込)
          .item
            span 子供（中学生以下）
            span.value {{ event.fields.feeChild.toLocaleString() }}
            span.unit 円(税込)
          .excuse ※ 当日のお支払いは現金のみでお願いします。
      .col-lg-5.col-sm-6
        .event-schedule
          .label
            fa.mr-2(:icon="faStopwatch")
            span スケジュール
          .item
            ul.timeline
              li.schedule(v-for="schedule in event.fields.eventSchedule")
                .tl-item
                  .time {{ schedule.time }}
                  .content {{ schedule.content }}
    .row.mt-4
      .offset-lg-1.col-lg-11.col-sm-12
        n-link.entry-link(to="/entry")
          strong かくれんぼ選手権への参加申込はコチラ
          fa.ml-2(:icon="faAngleDoubleRight")
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
  faStopwatch,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

export default {
  mixins: [datetimeParserMixin, descriptionParserMixin],
  data() {
    return {
      faCalendarAlt,
      faMapMarkerAlt,
      faYenSign,
      faStopwatch,
      faAngleDoubleRight,
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
    margin-bottom: 10px
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
  .event-date, .event-schedule, .event-location, .event-fee
    margin-bottom: 30px
    .label
      color: $primary-grey
      font-size: 20px
      font-weight: bold
      margin-bottom: 8px
      display: flex
      align-items: center
    .item
      font-weight: bold
      margin-bottom: 10px
      .value
        font-size: 22px
      .unit
        font-size: 14px
    .excuse
      color: $primary-grey
      font-size: 14px
      margin-top: 10px
  .event-schedule
    .timeline
      padding: 0
      margin: 0
      box-sizing: border-box
      list-style: none
      .schedule
        margin-left: 5px
        .tl-item
          padding: 10px 0 10px 20px
          border-color: $accent-color
          border-style: solid
          border-width: 0 0 0 2px
          margin: 0 0 0 -1px
          &:before
            content: ""
            width: 10px
            height: 10px
            background-color: white
            box-shadow: 0 0 0 4px white
            border-color: inherit
            border-width: 3px
            border-radius: 50%
            border-style: solid
            margin: 0 0 0 -26px
            position: relative
            top: 5px
            float: left
  .entry-link
    color: black
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
  .preparing
    text-align: center
    font-size: 20px
    font-weight: bold
</style>