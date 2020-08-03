<template>
  <button style="opacity: 0" ref="button" class="ButtonScroll" @click="navigateToArticles">
    <span class="Text">Scroll</span>
    <span ref="arrow" class="Arrow">&rarr;</span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      _scrollListener: null
    }
  },
  mounted() {
    this.$anime.timeline({
      targets: this.$refs.button,
      easing: 'easeInOutExpo',
    })
    .add({
      opacity: 1,
      duration: 2000,
      delay: 2800
    })

    // this.$anime({
    //   targets: this.$refs.arrow,
    //   easing: 'easeInOutExpo',
    //   duration: 500,
    //   loop: true,
    //   translateY: 12
    // })

  },
  methods: {
    navigateToArticles: function() {
      window.scrollBy({
        top: window.innerHeight - window.scrollY - 100,
        left: 0,
        behaviour: 'smooth'
      })
    },
  }  
}
</script>

<style scoped lang="scss">
  .ButtonScroll {
    color: var(--t-color-tint-50);
    transform: rotate(90deg);
  }

  .Text {
    font-weight: bold;
    font-size: .75rem;
    padding-right: .125rem;
  }

  .Arrow {
    position: relative;
    bottom: -2px;
  }
</style>
