<template>
  <div>

    <BackgroundContainer />

    <section class="Hero" ref="hero">
      <Logo />
    </section>

    <div class="ScrollArrow">
      <ScrollArrow />
    </div>

    <Wall 
      v-if="showWall"
      :showPosts="true"
      :showProjects="true"
      :showSelector="true"
      :sectionTitle="'Muro'"
    />

  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import { Parser } from 'rss-parser'

export default {
  data() {
    return {
      showWall: false,
      scrollThreshold: 30,
      _resizeListener: null,
      _scrollListener: null,
    }
  },
  mounted() {
    this._resizeListener = () => this.calcHeight()
    window.addEventListener('resize', this._resizeListener)

    setTimeout(() => {
      this.showWall = true
    }, 1500)

    // this.showWall = window.scrollY > this.scrollThreshold

    // this._scrollListener = window.addEventListener('scroll', () => {
    //   if (!this.showWall && window.scrollY > this.scrollThreshold) {
    //     this.showWall = true;
    //   }
    // })

    this.calcHeight();
  },
  methods: {
    calcHeight: function() {
      if (window) {
        const heroHeight = window.innerHeight - document.querySelector('[main-header]').clientHeight;
        this.$refs.hero.style.height = heroHeight + 'px';
      }
    },
  }
}
</script>

<style scoped lang="scss">

  @import 'assets/configs';

  .Hero {
    height: calc(100vh - 64px)
  }

  .ScrollArrow {
    position: absolute;
    left: 50%;
    bottom: 5.5rem;
    transform: translate(-50%, 0)
  }


</style>
