<template lang="pug">
div
  nuxt
</template>

<style lang="sass">
html
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  font-size: 14px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

*, *:before, *:after
  box-sizing: border-box
  margin: 0

a
  text-decoration: none
  transition: 0.3s
  &:hover
    text-decoration: none
    opacity: 0.7

#wrapper
  .section
    padding-bottom: 100px
  .section-dark
    background-color: $primary-dark

*[lazy=loaded]
  animation-duration: 0.5s
  animation-fill-mode: both
  animation-name: scrollIn

@keyframes scrollIn
  from
    opacity: 0
  to
    opacity: 1
</style>
