<template>
  <header class="Header" main-header>
    <div class="FixedContainer" :class="{'--floating': this.floatingHeader}">
      <div class="Content o-container">
        <div class="HeaderSide --left">
        <img class="Logo" src="~/assets/images/logo-asm.svg" />
        </div>
        <div class="HeaderSide --rigth">
          <button class="MenuButton" @click="toggleOpen()">
            <IMenu :isOpen="open"/>
          </button>
          <div class="Menu">
            <div class="MenuOverlay" @click="toggleOpen()" :class="{'--open': open}"></div>
            <div class="MenuBackground" style="transform: scale(0.01)" :class="{'--open': open}"></div>
            <nav class="MenuWrapper" :class="{'--open': open}">
              <div @click="toggleOpen()" class="MenuContainer o-container">
                <nuxt-link class="MenuLink" to="/">Home</nuxt-link>
                <nuxt-link class="MenuLink" to="/portfolio">Mis proyectos</nuxt-link>
                <nuxt-link class="MenuLink" to="/blog">Blog</nuxt-link>
                <nuxt-link class="MenuLink" to="/about">Sobre mí</nuxt-link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      _scrollListener: null,
      floatingHeader: false,
      open: false
    }
  },
  mounted() {
    this.floatingHeader = window.scrollY > 5;
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
  methods: {
    toggleOpen() {
      this.open = !this.open
    }
  },
  watch: { 
    open: function(isOpen, oldVal) {
      const radius = window.innerHeight / 12;
      this.$anime.timeline({
        targets: '.MenuBackground',
        easing: 'easeInOutExpo',
      })
      .add({
        duration: 800,
        scale: isOpen ? radius : .01,
      })

      this.$anime.timeline({
        targets: '.MenuWrapper',
        easing: 'linear',
      })
      .add({
        duration: 400,
        opacity: isOpen ? 1 : 0,
        delay: isOpen ? 400 : 0
      })
    }
  }
}
</script>

<style lang="scss">

  @import 'assets/configs';

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
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .Logo {
    flex: 0 0 auto;
  }

  .HeaderSide {
    flex: 1 1 100%;
    &.--rigth {
      display: flex;
      align-items: center;
      justify-content: flex-end
    }
  }

  .MenuButton {
    position: relative;
    /* right: 40px;
    bottom: 16px; */
    z-index: 2;
    /* padding: .35rem; */
    border-radius: 3px;
    display: block;
    box-sizing: border-box;
    background-color: white;
    /* transition: background-color .3s linear;
    :hover {
      background-color: var(--color-skeleton);
    } */
  }

  .MenuWrapper {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    padding-top: 8rem;
    pointer-events: none;
    opacity: 0; 
    &.--open {
      pointer-events: all;
    }
  }

  .MenuContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .MenuLink {
    display: inline;
    font-size: 2rem;
    font-weight: bolder;
    color: var(--t-color-tint-60);
    text-decoration: none;
    margin-bottom: 2.5rem;
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 4px;
      background-color: var(--color-primary);
      width: 100%;
      position: absolute;
      bottom: -6px;
      opacity: 0;
      transform-origin: left center;
      transform: scaleX(0);
      transition: opacity .3s linear, transform .3s ease-in-out;
    }
    &:hover {
      &:after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

  .MenuBackground {
    background: white;
    width: 20px;
    height: 20px;
    position: fixed;
    top: 29px;
    border-radius: 50%;
    pointer-events: none;
    &.--open {
      pointer-events: all;
    }
  }

  .MenuOverlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    background: rgba(0, 0, 0, .75);
    transition: opacity 1s linear;
    opacity: 0;
    &.--open {
      opacity: 1;
      pointer-events: all;
    }
  }

  .Link {
    text-decoration: none;
    color: var(--t-color-tint-60);
    position: relative;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    &:after {
      content: '';
      display: block;
      height: 2px;
      background-color: var(--color-primary);
      width: 100%;
      position: absolute;
      bottom: -3px;
      opacity: 0;
      transform-origin: left center;
      transform: scaleX(0);
      transition: opacity .3s linear, transform .3s ease-in-out;
    }
    &:hover {
      &:after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }

</style>