<template lang="pug">
  .paging
    ol.list(v-if="totalPages > 1")
      li.item(v-for="page in totalPages" :key="page")
        n-link.link(:to="`/blogs/page/${page}`" :class="{ active: isActivePage(page) }") {{ page }}
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    skip: {
      type: Number,
      required: true
    }
  },
  methods: {
    isActivePage(page) {
      return `${page}` === (this.$route.params.page || "1");
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    currentPage() {
      return this.skip / this.limit + 1;
    }
  }
};
</script>

<style lang="sass" scoped>
.paging
  text-align: center
  .list
    padding: 0
    margin: 0
    .item
      display: inline
      font-size: 16px
      margin-right: 10px
      &:last-child
        margin-right: 0
      .link
        color: inherit
        text-decoration: none
        padding: 5px 10px
        border: 2px solid black
        &:hover, &.active
          color: white
          background-color: black
</style>