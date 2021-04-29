
<template lang="pug">
#gallery-tile
  .row.no-gutters
    .col-sm-4.px-1.pb-sm-2.pb-1(
      v-for="(photo, index) in gallery",
      :key="index"
    )
      .photo(v-lazy:background-image="photo.fields.file.url")
</template>

<script>
export default {
  props: {
    gallery: {
      type: Array,
      requrired: true,
    },
  },
};
</script>

<style lang="sass" scoped>
#gallery-tile
  .photo
    width: 100%
    padding-top: 60%
    background-size: cover
    background-position: center center
</style>
