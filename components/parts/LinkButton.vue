<template lang="pug">
.link-button
  .container
    n-link.link(:to="path")
      span.mr-2 Go to
      strong Kakurenbo's {{ pageName }}
      fa.ml-2(:icon="faAngleDoubleRight")
</template>

<script>
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      faAngleDoubleRight,
    };
  },
};
</script>

<style lang="sass" scoped>
.link
  display: inline-block
  color: black
  font-family: $en-accent-family
  padding: 15px 20px
  border: 2px solid black
  &:hover
    color: white
    text-decoration: none
    background-color: black
  @include media-breakpoint-down(sm)
    .link
      font-size: 18px
  @include media-breakpoint-down(xs)
    .link
      font-size: 14px
</style>