<template>
  <div ref="container" class="Container" style="background-color: #FBF7ED"></div>
</template>

<script>
export default {
  data() {
    return {
      _resizeListener: null,
      containerSize: null
    }
  },
  mounted() {
    this._resizeListener = () => {
      this.$anime({
        targets: this.$refs.container,
        easing: 'linear',
        duration: 0,
        scaleX: this.calcSize().scaleX,
        scaleY: this.calcSize().scaleY,
        translateY: this.calcSize().translateY,
      })
    }

    window.addEventListener('resize', this._resizeListener);

    this.$anime.timeline({
      targets: this.$refs.container,
      easing: 'easeInOutExpo',
    })
    .add({
      scaleX: this.calcSize().scaleX,
      scaleY: this.calcSize().scaleY,
      translateY: this.calcSize().translateY,
      duration: 1300,
      delay: 2600
    })
    // .add({
    //   easing: 'linear',
    //   duration: 300,
    //   backgroundColor: '#FBF7ED',
    // })
    
  },
  methods: {
    calcSize: function() {
      const headerHeight = document.querySelector('[main-header]').clientHeight;
      const padding = window.innerWidth >= 768 ? 40 : 24
      const verticalFactor = (window.innerHeight - headerHeight - padding) / window.innerHeight
      return {
        scaleX: window.innerWidth >= 1360 
          ? 1360 / window.innerWidth 
          : (window.innerWidth - (2 * padding)) / window.innerWidth, 
        scaleY: verticalFactor,
        translateY: headerHeight / verticalFactor
      }
    }
  }  
}
</script>

<style scoped lang="scss">
  .Container {
    position: absolute;
    z-index: -1;
    transform-origin: top center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
