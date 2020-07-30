<template>
  <header class="Header" main-header>
    <div class="FixedContainer" :class="{'--floating': this.floatingHeader}">
      <div class="Content o-container">
        <div class="HeaderSide"></div>
        <img class="Logo" src="~/assets/images/logo-asm.svg" />
        <div class="HeaderSide"></div>
        <!-- <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/articles">Arciles</nuxt-link> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      _scrollListener: null,
      floatingHeader: false
    }
  },
  mounted() {
    this._scrollListener = window.addEventListener('scroll', () => {
      const threshold = 5;
      if (!this.floatingHeader && window.scrollY > threshold) {
        this.floatingHeader = true;
      }

      if (this.floatingHeader && window.scrollY <= threshold) {
        this.floatingHeader = false;
      }
    })
  },
}
</script>

<style lang="scss">

  .Header {
    height: 64px;
    width: 100%;
  }

  .FixedContainer {
    height: 64px;
    width: 100%;
    top: 0;
    position: fixed;
    z-index: 10;
    &:before {
      content: ' ';
      transition: opacity .3s linear;
      display: block;
      opacity: 0;
      background: white;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, .12)
    }
    &.--floating {
      &:before {
        opacity: 1;
      }
    }
  }

  .Content {
    height: 64px;
    width: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem 0;
  }

  .Logo {
    flex: 0 0 auto;
  }

  .HeaderSide {
    flex: 1 1 100%;
    /* height: 10px;
    background: lavenderblush; */
  }

</style>