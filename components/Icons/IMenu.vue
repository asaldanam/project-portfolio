<template>
  <div class="MenuIcon" :class="{'--open': isOpen}">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: ['isOpen']
}
</script>

<style lang="scss" scoped>

  .MenuIcon {
    & > * {
      width: 20px;
      height: 2px;
      background-color: black;
      border-radius: 2px;
      transition: transform .3s ease-in-out;
    }
    & > *:not(:last-child) {
      margin-bottom: 4px
    }

    &.--open {
      & > *:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      & > *:nth-child(2) {
        transform: scaleX(0);
      }
      & > *:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }
</style>