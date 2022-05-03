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
          :active="isActive",
          @toggle="toggleNavMenu",
          ref="burgerButton"
        )
    .collapse-menu.mx-auto
      ul.navbar-nav
        li.nav-item(v-for="(value, index) in navItems", :key="index")
          n-link.nav-link(:to="`/${value}`")
            .icon
              .img(:is="`svg-${value}`")
            .text {{ value.toUpperCase() }}
  #navbarMenu.container
    ul.navbar-nav(@click="toggleActive")
      li.nav-item(v-for="(value, index) in navItems", :key="index")
        n-link.nav-link(:to="`/${value}`")
          span.icon
            .img(:is="`svg-${value}`")
          span.text {{ value.toUpperCase() }}
</template>

<script>
export default {
  data() {
    return {
      navItems: ["rules", "gallery", "blog", "event"],
      activeLink: "",
      isActive: false,
    };
  },
  methods: {
    toggleNavMenu(active) {
      const nav = document.querySelector("#navbarMenu");
      active ? nav.classList.add("visible") : nav.classList.remove("visible");
    },
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="sass" scoped>
.header-nav.fixed-top
  height: 50px
  div.icon
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
      color: $primary-grey
      font-weight: bold
      div.icon
        margin-bottom: 5px
        .img
          width: 30px
          height: auto
      span.icon
        margin-right: 5px
        .img
          width: 20px
          height: auto
@include media-breakpoint-down(md)
  .toggle-button
    display: block !important
  .collapse-menu
    display: none
  #navbarMenu
    display: block !important
    position: fixed
    top: 70px
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
        padding: 15px 0
        border-bottom: 1px solid $secondary-grey
        margin-left: 0 !important
        &:last-child
          border-bottom: none
        .nav-link
          display: flex
          align-items: center
          justify-content: center
</style>