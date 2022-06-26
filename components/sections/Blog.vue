<template lang="pug">
.blog
  .blog-wrapper.container
    .row.blog-post(v-for="(post, index) in blogPosts")
      .col-lg-6(:class="index % 2 == 0 ? 'order-lg-1' : 'order-lg-2'")
        n-link.image(
          :to="`/blog/${post.fields.slug}/`",
          v-lazy:background-image="post.fields.eyecatch.fields.file.url"
        )
      .col-lg-6(:class="index % 2 == 0 ? 'order-lg-2' : 'order-lg-1'")
        .header
          n-link.title(:to="`/blog/${post.fields.slug}/`") {{ post.fields.title }}
          .created-at
            fa.mr-2(:icon="faCalendarAlt")
            span {{ parseCreatedAt(post.sys.createdAt) }}
        .body(v-html="parseDescription(post.fields.body)")
</template>

<script>
import datetimeParserMixin from "@/components/mixins/datetimeParserMixin";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

export default {
  mixins: [datetimeParserMixin],
  data() {
    return {
      faCalendarAlt,
    };
  },
  props: {
    blogPosts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    parseDescription(text) {
      return `${text.substr(0, 170).replace(/\n/g, "<br>")}...`;
    },
  },
};
</script>

<style lang="sass" scoped>
.blog
  .blog-wrapper
    .blog-post
      margin-bottom: 80px
      .image
        display: block
        width: 100%
        padding-bottom: 60%
        background-size: cover
        background-position: center center
      @include media-breakpoint-down(md)
        .image
          margin-bottom: 10px
      .header
        margin-bottom: 20px
        .title
          display: block
          color: black
          font-family: $ja-accent-family
          font-size: 20px
          line-height: 1.2
          text-decoration: none
          margin-bottom: 3px
        .created-at
          color: $secondary-grey
          font-size: 14px
      .body
        color: $primary-grey
        line-height: 2
</style>