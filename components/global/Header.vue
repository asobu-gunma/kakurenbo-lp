<template lang="pug">
header.navbar.navbar-expand-lg.header-nav(
  :class="{ 'fixed-top': $store.state.isFixed }"
)
  nav.container
    .toggle-button
      client-only
        tasty-burger-button(
          type="spin",
          color="black",
          size="s",
          @toggle="toggleNavMenu",
          ref="burgerButton"
        )
    .collapse-menu.mx-auto
      ul.navbar-nav
        li.nav-item
          n-link.nav-link(v-scroll-to="'#about'", to)
            .icon
              img(v-lazy="about")
            .text ABOUT
        li.nav-item
          n-link.nav-link(v-scroll-to="'#concept'", to)
            .icon
              img(v-lazy="concept")
            .text CONCEPT
        li.nav-item
          n-link.nav-link(v-scroll-to="'#gallery'", to)
            .icon
              img(v-lazy="gallery")
            .text GALLERY
        li.nav-item
          n-link.nav-link(v-scroll-to="'#team'", to)
            .icon
              img(v-lazy="team")
            .text TEAM
        li.nav-item
          n-link.nav-link(v-scroll-to="'#blog'", to)
            .icon
              img(v-lazy="blog")
            .text BLOG
        li.nav-item
          n-link.nav-link(v-scroll-to="'#event'", to)
            .icon
              img(v-lazy="event")
            .text EVENT
        li.nav-item
          n-link.nav-link(v-scroll-to="'#contact'", to)
            .icon
              img(v-lazy="contact")
            .text CONTACT
  #navbarMenu.container
    ul.navbar-nav(@click="toggleActive")
      li.nav-item
        n-link.nav-link(v-scroll-to="'#about'", to) ABOUT
      li.nav-item
        n-link.nav-link(v-scroll-to="'#concept'", to) CONCEPT
      li.nav-item
        n-link.nav-link(v-scroll-to="'#gallery'", to) GALLERY
      li.nav-item
        n-link.nav-link(v-scroll-to="'#team'", to) TEAM
      li.nav-item
        n-link.nav-link(v-scroll-to="'#blog'", to) BLOG
      li.nav-item
        n-link.nav-link(v-scroll-to="'#event'", to) EVENT
      li.nav-item
        n-link.nav-link(v-scroll-to="'#contact'", to) CONTACT
</template>

<script>
import about from "@/assets/images/about.svg";
import concept from "@/assets/images/concept.svg";
import gallery from "@/assets/images/gallery.svg";
import team from "@/assets/images/team.svg";
import blog from "@/assets/images/blog.svg";
import event from "@/assets/images/event.svg";
import contact from "@/assets/images/contact.svg";

export default {
  data() {
    return {
      about,
      concept,
      gallery,
      team,
      blog,
      event,
      contact,
      activeLink: "",
    };
  },
  methods: {
    toggleNavMenu(active) {
      const nav = document.querySelector("#navbarMenu");
      active ? nav.classList.add("visible") : nav.classList.remove("visible");
    },
    toggleActive() {
      this.$refs.burgerButton.toggle();
    },
  },
};
</script>

<style lang="sass" scoped>
.header-nav.fixed-top
  height: 50px
  .icon
    display: none
.header-nav
  height: 100px
  font-family: $en-accent-family
  text-align: center
  background-color: $accent-color
  .logo
    font-weight: bold
    padding: 0 10px
    border: 3px solid black
  .toggle-button
    display: none
    margin-top: 5px
    button
      outline: none
  #navbarMenu
    display: none
  .nav-item
    margin-left: 20px
    .nav-link
      color: #4C4C4C
      font-weight: bold
      .icon
        margin-bottom: 5px
        img
          width: 30px
@include media-breakpoint-down(md)
  .toggle-button
    display: block !important
  .collapse-menu
    display: none
  #navbarMenu
    display: block !important
    position: fixed
    top: 50px
    left: 50%
    transform: translateX(-50%)
    width: 100%
    background-color: $accent-color
    visibility: hidden
    opacity: 0
    transition: 0.3s
    &.visible
      visibility: visible
      opacity: 1
    .navbar-nav
      width: 100%
      padding: 0 20px
      .nav-item
        padding: 20px 0
        border-bottom: 1px solid $secondary-grey
        margin-left: 0 !important
        &:last-child
          border-bottom: none
</style>