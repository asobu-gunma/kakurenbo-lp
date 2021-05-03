
<template lang="pug">
.gallery-movie
  .container
    .row
      .offset-lg-2.col-lg-8
        .movie
          youtube(
            :video-id="youtubeIds[0]",
            :fitParent="true",
            :resize="true",
            ref="youtube"
          )
        .thumbnail-list.d-flex.justify-content-center
          .thumbnail(
            v-for="id in youtubeIds",
            v-lazy:background-image="`https://img.youtube.com/vi/${id}/sddefault.jpg`",
            @click="changeVideo(id)"
          )
</template>

<script>
export default {
  props: {
    youtubeIds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeVideo(videoId) {
      this.$refs.youtube.videoId = videoId;
    },
  },
};
</script>

<style lang="sass" scoped>
.gallery-movie
  margin-top: 50px
  .movie
    margin-bottom: 10px
  .thumbnail-list
    .thumbnail
      width: 128px
      height: 72px
      background-size: cover
      background-position: center center
      margin: 0 5px
      cursor: pointer
      transition: 0.3s
</style>