export default {
  methods: {
    parseCreatedAt(datetime) {
      return this.$dateFormat(datetime, "yyyy.MM.dd");
    },
    parseDatetimeArray(datetime) {
      return this.$dateFormat(datetime, "yyyy,M,d,EEEEE,h:mm").split(",")
    }
  }
}