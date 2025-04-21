<script>

export default {
    data() {
        return {
            islogin: true,
        }
    },
    computed: {
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
        languages() {
            const lang = this.$store.getters['head/head-top/languages']
            return lang.filter(l => l.code !== this.currentLang.code)
        },
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
            :currentLang="currentLang"
            :languages="languages"
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
