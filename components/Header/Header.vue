<template>
  <header class="Header" main-header>
    <div class="FixedContainer" :class="{'--floating': this.floatingHeader}">
      <div class="Content o-container">

        <!-- left -->
        <div class="HeaderSide --left">
          <button class="MenuButton" @click="toggleOpen()">
            <IMenu :isOpen="open"/>
          </button>
          <div class="Menu" :class="{'--open': open}">
            <div ref="menuoverlay" class="MenuOverlay" style="opacity: 0" @click="toggleOpen()"></div>
            <div ref="menubackground" class="MenuBackground" style="transform: translateX(-100%)"></div>
            <nav ref="menuwrapper" class="MenuWrapper" style="opacity: 0">
              <div @click="toggleOpen()" class="MenuContainer o-container">
                <nuxt-link class="MenuLink" to="/">Home</nuxt-link>
                <nuxt-link class="MenuLink" to="/portfolio">Mis proyectos</nuxt-link>
                <nuxt-link class="MenuLink" to="/blog">Blog</nuxt-link>
                <!-- <nuxt-link class="MenuLink" to="/about">Sobre mí</nuxt-link> -->
              </div>
              <div class="Contact o-container">
                <div class="ContactName">Abel Saldaña Martínez</div>
                <div class="ContactEmail">asaldanam@gmail.com</div>
                <a class="ContactLink" href="https://www.linkedin.com/in/asaldanam/">Contactar</a>
              </div>
            </nav>
          </div>
        </div>

        <!-- logo -->
        <img class="Logo" src="~/assets/images/logo-asm.svg" role="presentation"/>

        <!-- right -->
        <div class="HeaderSide --rigth">
          <a class="Linkedin" href="https://www.linkedin.com/in/asaldanam/" aria-label="linkedin">
            <img src="~/assets/images/i-linkedin.svg" role="presentation"/>
          </a>
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

      document.body.style.overflow = isOpen ? 'hidden' : 'initial'

      this.$anime({
        targets: '.MenuBackground',
        easing: 'easeInOutExpo',
        duration: 800,
        translateX: isOpen ? '0%' : '-100%'
      })

      // this.$anime({
      //   targets: '.Main',
      //   easing: 'easeInOutExpo',
      //   duration: 800,
      //   translateX: isOpen ? '60%' : '0%'
      // })

      this.$anime({
        targets: '.MenuWrapper',
        easing: 'easeInOutExpo',
        duration: 400,
        opacity: isOpen ? 1 : 0,
        delay: isOpen ? 400 : 0
      })

      this.$anime({
        targets: '.MenuOverlay',
        easing: 'easeInOutExpo',
        duration: 800,
        opacity: isOpen ? 1 : 0,
      })
      
    }
  }
}
</script>

<style lang="scss">

  @import 'assets/configs';

  .Header {
    width: 100%;
    height: 52px;
    @include tablet {
      height: 64px;
    }
  }

  .FixedContainer {
    height: 52px;
    width: 100%;
    top: 0;
    position: fixed;
    z-index: 10;
    &:before {
      content: ' ';
      transition: opacity .15s linear;
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
    @include tablet {
      height: 64px;
    }
  }

  .Content {
    height: 100%;
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
    z-index: -1;
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

  .Menu {
    pointer-events: none;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* padding-top: 8rem; */
    &.--open {
      pointer-events: all;
    }
  }

  .MenuWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .MenuContainer {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 4.5rem;
    box-sizing: border-box;
    @include tablet {
      padding-top: 5.5rem;
      
    }
  }

  .MenuLink {
    display: inline;
    font-size: 1.75rem;
    font-weight: bolder;
    color: var(--t-color-tint-60);
    text-decoration: none;
    margin-bottom: 2rem;
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
    @include tablet {
      font-size: 2rem;
      margin-bottom: 2.5rem;
    }
  }

  .Contact {
    margin-top: auto;
    flex: 0 0 auto;
    padding-bottom: 2rem;
    & > * {
      line-height: 1.4;
    }
    @include tablet {
      padding-bottom: 4rem;
    }
  }

  .ContactName {
    font-weight: bold;
  }

  .ContactLink {
    color: var(--color-primary);
    margin-top: .75rem;
    display: block;
    text-decoration: none;
    text-transform: uppercase;
    font-size: .875rem;
    font-weight: bold;
    letter-spacing: 1px;
    &:hover {
      text-decoration: underline;
    }
  }

  .MenuBackground {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: calc(100% - 60px);
    @include tablet {
      width: calc(60%);
    }
    @include desktop {
      width: calc(30%);
    }
  }

  .MenuOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .35);
    opacity: 1;
  }

  .Linkedin {
    background-color: transparent;
    padding: 4px 8px;
    border-radius: 4px;
    position: relative;
    bottom: -6px;
    &:hover {
      background-color: var(--t-color-tint-10);
      & > img {
        opacity: 1;
      }
    }
    & > img {
      opacity: .5;
      transition: opacity .25s linear;
      height: 20px;
    }
  }

</style>