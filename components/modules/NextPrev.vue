<template lang="pug">
  .paging.container
    .row
      .offset-sm-1.col-sm-10
        .row
          .col-6
            client-only
              .next-post(v-if="nextPost")
                n-link(:to="`/blogs/${nextPost.fields.slug}`")
                  .post-image(v-lazy:background-image="nextPost.fields.eyecatch.fields.file.url")
                  .post-title {{ nextPost.fields.title }}
                  .post-created-at
                    i.far.fa-calendar-alt.mr-2
                    span {{ parseCreatedAt(nextPost.sys.createdAt) }}
          .col-6
            client-only
              .prev-post(v-if="prevPost")
                n-link(:to="`/blogs/${prevPost.fields.slug}`")
                  .post-image(v-lazy:background-image="prevPost.fields.eyecatch.fields.file.url")
                  .post-title {{ prevPost.fields.title }}
                  .post-created-at
                    i.far.fa-calendar-alt.mr-2
                    span {{ parseCreatedAt(prevPost.sys.createdAt) }}
</template>

<script>
import datetimeParserMixin from "@/components/mixins/datetimeParserMixin";

export default {
  mixins: [datetimeParserMixin],
  props: {
    nextPost: {
      type: Object
    },
    prevPost: {
      type: Object
    }
  }
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