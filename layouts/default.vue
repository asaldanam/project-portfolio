<template>
  <div>
    <Header />
    <main class="Main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1930457,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  },
}
</script>

<style lang="scss">

  .Main {
    /* padding-bottom: 6rem; */
  }

 

</style>
