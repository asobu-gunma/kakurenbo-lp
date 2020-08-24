<template lang="pug">
.blog
  .blog-wrapper.container
    .blog-post.row
      .offset-sm-1.col-sm-10
        .blog-post-header
          .image(
            v-lazy:background-image="blogPost.fields.eyecatch.fields.file.url"
          )
          h1.title {{ blogPost.fields.title }}
          .created-at
            fa.mr-2(:icon="faCalendarAlt")
            span {{ parseCreatedAt(blogPost.sys.createdAt) }}
        .blog-post-body
          .markdown-body(v-html="$md.render(blogPost.fields.body)")
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
    blogPost: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.blog
  .blog-wrapper
    .blog-post
      margin-bottom: 80px
      .blog-post-header
        margin-bottom: 20px
        .image
          display: block
          width: 100%
          padding-bottom: 60%
          background-size: cover
          background-position: center center
        .title
          display: block
          color: black
          font-family: $ja-accent-family
          text-decoration: none
          margin-bottom: 3px
        .created-at
          color: $secondary-grey
          font-size: 14px
      .markdown-body
        color: $primary-grey
        line-height: 2
    @include media-breakpoint-up(sm)
      .image
        margin-bottom: 20px
      .title
        font-size: 28px
      .markdown-body
        font-size: 16px
    @include media-breakpoint-down(xs)
      .image
        margin-bottom: 10px
      .title
        font-size: 20px
      .markdown-body
        font-size: 14px
</style>