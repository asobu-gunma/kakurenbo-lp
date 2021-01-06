export default {
  methods: {
    parseEventButtonDate(datetime) {
      return this.$dateFormat(datetime, "M月d日");
    },
    parseCreatedAt(datetime) {
      return this.$dateFormat(datetime, "yyyy.MM.dd");
    },
    parseDatetimeArray(datetime) {
      return this.$dateFormat(datetime, "yyyy,M,d,EEEEE,H:mm").split(",");
    },
  }
}