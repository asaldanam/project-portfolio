<template>
  <div>
    <BackgroundContainer />
    <section class="Hero" ref="hero">
      <Logo />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      _resizeListener: null
    }
  },
  mounted() {
    this._resizeListener = () => this.calcHeight()
    window.addEventListener('resize', this._resizeListener)
    this.calcHeight();
  },
  methods: {
    calcHeight: function() {
      if (window) {
        console.log(heroHeight, this.$refs.hero);
        const heroHeight = window.innerHeight - document.querySelector('[main-header]').clientHeight;
        this.$refs.hero.style.height = heroHeight + 'px';
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .Hero {
    height: calc(100vh - 64px)
  }
</style>
