<template lang="pug">
.gallery
  .photo-area
    Hooper(:settings="hooperSettings", ref="carousel")
      Slide(v-for="photo in gallery", :key="photo.sys.id")
        .photo(v-lazy:background-image="photo.fields.file.url")
  ul.pagination
    li.prev(@click="slidePrev")
      img(:src="arrowLeft", alt="arrow left")
    li.page(
      v-for="(photo, index) in gallery",
      :key="photo.sys.id",
      v-lazy:background-image="photo.fields.file.url",
      @click="slideTo(index)"
    )
    li.next(@click="slideNext")
      img(:src="arrowRight", alt="arrow right")
</template>

<script>
import { Hooper, Slide, Navigation } from "hooper";
import "hooper/dist/hooper.css";
import arrowLeft from "@/assets/images/arrow_left.svg";
import arrowRight from "@/assets/images/arrow_right.svg";
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
      arrowLeft,
      arrowRight,
      hooperSettings: {
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
  display: none
  margin-bottom: 50px
  .photo-area
    .hooper
      height: 60%
      .hooper-track
        .hooper-slide
          .photo
            width: 100%
            height: 0
            background-size: cover
            background-position: center center
            padding-top: 60%
  .pagination
    display: flex
    justify-content: center
    align-items: center
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
    .prev, .next
      background-color: rgba(0, 0, 0, 0.3)
      padding: 10px 13px 11px
      cursor: pointer
      img
        width: 15px
    .prev
      margin-right: 5px
    .next
      margin-left: 5px
@media screen and (max-width: 1024px)
  .gallery
    display: block !important
@media screen and (max-width: 480px)
  .gallery
    display: block !important
</style>