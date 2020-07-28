<template>
  <div>
    <header class="Header" main-header>
      <div class="FixedContainer">
        <div class="Content t-container">
          <nuxt-link to="/">Home</nuxt-link>
          <nuxt-link to="/articles">Arciles</nuxt-link>
        </div>
      </div>
    </header>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss">

  .Header {
    height: 64px;
    width: 100%;
  }

  .FixedContainer {
    height: 64px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 10;
  }

  .Content {
    height: 64px;
    width: 100%;
  }

</style>
