<template lang="pug">
.gallery
  .photo-area
    Hooper(:settings="hooperSettings", ref="carousel")
      Slide(v-for="photo in gallery", :key="photo.sys.id")
        .photo(v-lazy:background-image="photo.fields.file.url")
    .navigation
      .prev(@click="slidePrev")
        svg-arrow-left.img
      .next(@click="slideNext")
        svg-arrow-right.img
  ul.pagination
    li.page(
      v-for="(photo, index) in gallery",
      :key="photo.sys.id",
      v-lazy:background-image="photo.fields.file.url",
      @click="slideTo(index)"
    )
</template>

<script>
import { Hooper, Slide, Navigation } from "hooper";
import "hooper/dist/hooper.css";
export default {
  components: {
    Hooper,
    Slide,
    Navigation,
  },
  props: {
    gallery: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true,
        infiniteScroll: true,
        mouseDrag: false,
        touchDrag: false,
        shortDrag: false,
        wheelControl: false,
      },
    };
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
    slideTo(index) {
      this.$refs.carousel.slideTo(index);
    },
  },
};
</script>

<style lang="sass" scoped>
.gallery
  margin-bottom: 50px
  .photo-area
    position: relative
    .hooper
      height: 60%
      .hooper-track
        .hooper-slide
          .photo
            width: 99%
            height: 0
            background-size: cover
            background-position: center center
            padding-top: 60%
    .navigation
      .prev, .next
        position: absolute
        top: 50%
        transform: translateY(-50%)
        background-color: rgba(255, 255, 255, 0.3)
        padding: 10px 13px 11px
        border: 1px solid white
        cursor: pointer
        .img
          width: 15px
          height: auto
      .prev
        left: 26%
      .next
        right: 26.5%
  .pagination
    display: flex
    justify-content: center
    list-style: none
    margin-top: 20px
    .page
      width: 40px
      height: 40px
      background-size: cover
      background-position: center center
      margin: 0 5px
      cursor: pointer
      transition: 0.3s
      &:hover
        opacity: 0.7
@media screen and (max-width: 1024px)
  .gallery
    display: none !important
</style>