<template>
  <button class="Button" @click="navigateToArticles">
    <span class="Text">Scroll</span>
    <span class="Arrow">&rarr;</span>
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
    this._scrollListener = window.addEventListener('wheel', () => {
      console.log('scroll')
    })
  },
  methods: {
    navigateToArticles: function() {
      this.$router.push({path: 'articles'})
    },
  }  
}
</script>

<style scoped lang="scss">
  .Button {
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
