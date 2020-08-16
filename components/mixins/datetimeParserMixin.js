export default {
  methods: {
    parseCreatedAt(datetime) {
      return this.$dateFormat(datetime, "yyyy.MM.dd");
    }
  }
}