export default {
  methods: {
    parseEventButtonDate(datetime) {
      return this.$dateFormat(datetime, "M月d日");
    },
    parseCreatedAt(datetime) {
      return this.$dateFormat(datetime, "yyyy.MM.dd");
    },
    parseEventDate(datetime) {
      return this.$dateFormat(datetime, "yyyy.MM.dd H:mm~");
    },
    parseDatetimeArray(datetime) {
      return this.$dateFormat(datetime, "yyyy,M,d,EEEEE,H:mm").split(",");
    },
  }
}