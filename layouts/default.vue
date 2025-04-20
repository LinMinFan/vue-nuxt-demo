<script>
export default {
  data() {
    return {
      islogin: true,
    }
  },
  methods: {
    logout() {
      /* this.$store.dispatch('auth/logout') */
      this.islogin = false
    },
  },
}
</script>

<template>
  <div>
    <Header 
      :islogin="islogin" 
      :logout="logout" 
    />
    <main>
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
