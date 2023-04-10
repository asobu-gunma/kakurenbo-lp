<template lang="pug">
.event-list
  .container(v-if="eventList.length > 0")
    .row
      .event.col-sm-6(
        v-for="event in eventList"
        :key="event.sys.id"
      )
        .event-header
          n-link.image(
            v-lazy:background-image="event.fields.image.fields.file.url"
            :to="`/event/${event.fields.slug}/`"
          )
          n-link.title(
            :to="`/event/${event.fields.slug}/`"
          ) {{ event.fields.title }}
          .date
            fa.mr-2(:icon="faCalendarAlt")
            span.value {{ parseEventDate(event.fields.eventDate) }}
          .location.mb-2
            fa.mr-2(:icon="faMapMarkerAlt")
            span.value {{ event.fields.location }}
          .description {{ event.fields.description.substr(0, 100) }}...
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
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

export default {
  mixins: [datetimeParserMixin, descriptionParserMixin],
  data() {
    return {
      faCalendarAlt,
      faMapMarkerAlt,
      faYenSign,
      faStopwatch,
      faAngleDoubleRight
    };
  },
  props: {
    eventList: {
      type: Array
    }
  }
};
</script>

<style lang="sass" scoped>
.event-list
  .event
    .image
      display: block
      width: 100%
      padding-bottom: 60%
      background-size: cover
      background-position: center center
      margin-bottom: 5px
    .title
      font-size: 20px
      font-weight: bold
      color: inherit
    .date, .location
      font-size: 16px
      display: flex
      align-items: center
  .preparing
    text-align: center
    font-size: 20px
    font-weight: bold
</style>
