<template lang="pug">
.paging.container
  .row
    .offset-sm-1.col-sm-10
      .row
        .col-6
          .next-post(v-if="nextPost")
            n-link(:to="`/blog/${nextPost.fields.slug}/`")
              .post-image(
                v-lazy:background-image="nextPost.fields.eyecatch.fields.file.url"
              )
              .post-title {{ nextPost.fields.title }}
              .post-created-at
                fa.mr-2(:icon="faCalendarAlt")
                span {{ parseCreatedAt(nextPost.sys.createdAt) }}
        .col-6
          .prev-post(v-if="prevPost")
            n-link(:to="`/blog/${prevPost.fields.slug}/`")
              .post-image(
                v-lazy:background-image="prevPost.fields.eyecatch.fields.file.url"
              )
              .post-title {{ prevPost.fields.title }}
              .post-created-at
                fa.mr-2(:icon="faCalendarAlt")
                span {{ parseCreatedAt(prevPost.sys.createdAt) }}
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
    nextPost: {
      type: Object,
    },
    prevPost: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped>
.paging
  .next-post, .prev-post
    transition: 0.3s
    &:hover
      opacity: 0.7
  a
    color: inherit
    text-decoration: none
  .post-image
    width: 100%
    padding-bottom: 60%
    background-size: cover
    background-position: center center
    margin-bottom: 3px
  .post-title
    font-family: $ja-accent-family
    font-size: 16px
  .post-created-at
    color: $secondary-grey
</style>