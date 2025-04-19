<script>
export default {
  name: 'DefaultLayout',
  // 使用 vuex-persist 來持久化 vuex 的狀態
  /* beforeCreate() {
    this.$store.dispatch('config/initLang')
  }, */
}
</script>

<template>
    <div>
      <Header />
      <main>
        <Nuxt />
      </main>
      <Footer />
    </div>
  </template>

<style scoped>

</style>