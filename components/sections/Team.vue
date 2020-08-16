<template lang="pug">
.member
  .container
    ul.member-list
      li.member-item(
        v-for="member in memberList",
        :key="member.fields.position"
      )
        .photo(
          v-lazy:background-image="member.fields.photo.fields.file.url",
          @click="openProfile(member)"
        )
          .name {{ member.fields.name }}
        .title {{ member.fields.title }}
  .member-profile(v-if="existsProfile", @click="closeProfile()")
    .container
      .profile-top
        .row
          .col-lg-3.col-sm-4.col-5
            .photo(
              v-lazy:background-image="memberProfile.fields.photo.fields.file.url"
            )
          .col-lg-9.col-sm-8.col-7
            .name {{ memberProfile.fields.name }}
            .title {{ memberProfile.fields.title }}
      .profile-bottom
        .introduction(v-html="parseText(memberProfile.fields.introduction)")
</template>

<script>
export default {
  props: {
    memberList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      memberProfile: {},
    };
  },
  methods: {
    parseText(text) {
      if (text) return text.replace(/\n/g, "<br>");
      return "";
    },
    openProfile(member) {
      this.memberProfile = member;
    },
    closeProfile() {
      this.memberProfile = {};
    },
  },
  computed: {
    existsProfile() {
      return Object.keys(this.memberProfile).length > 0;
    },
  },
};
</script>

<style lang="sass" scoped>
.member
  .member-list
    list-style: none
    display: flex
    justify-content: center
    flex-wrap: wrap
    .member-item
      @include media-breakpoint-up(sm)
        margin: 0 15px 15px
      @include media-breakpoint-down(xs)
        margin: 0 10px 10px
      .photo
        background-size: cover
        background-position: center center
        border-radius: 50%
        margin-bottom: 5px
        position: relative
        overflow: hidden
        cursor: pointer
        @include media-breakpoint-up(sm)
          width: 150px
          height: 150px
        @include media-breakpoint-down(xs)
          width: 120px
          height: 120px
        .name
          color: white
          font-size: 12px
          text-align: center
          width: 100%
          background-color: rgba(0, 0, 0, 0.5)
          padding: 5px 0
          position: absolute
          bottom: 0
      .title
        color: $primary-grey
        font-size: 12px
        text-align: center
  .member-profile
    color: white
    width: 100%
    height: 100vh
    background-color: rgba(0, 0, 0, 0.9)
    position: fixed
    top: 0
    left: 0
    z-index: 1031 // Headerよりも上の層
    @include media-breakpoint-up(sm)
      padding: 100px 0
    @include media-breakpoint-down(xs)
      padding: 30px 0
    .profile-top
      border-bottom: 1px solid $primary-grey
      @include media-breakpoint-up(sm)
        padding-bottom: 50px
        margin-bottom: 50px
      @include media-breakpoint-down(xs)
        padding-bottom: 20px
        margin-bottom: 20px
      .photo
        width: 100%
        padding-bottom: 100%
        background-size: cover
        background-position: center center
        border-radius: 50%
      .name
        font-family: $ja-accent-family
        @include media-breakpoint-up(sm)
          font-size: 24px
        @include media-breakpoint-down(xs)
          margin-top: 10px
          font-size: 18px
      .title
        color: $secondary-grey
        @include media-breakpoint-up(sm)
          font-size: 14px
        @include media-breakpoint-down(xs)
          font-size: 12px
    .profile-bottom
      @include media-breakpoint-down(xs)
        font-size: 12px
</style>