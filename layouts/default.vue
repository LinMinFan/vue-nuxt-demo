<script>

export default {
    data() {
        return {
            islogin: true,
            searchCategory : 'all',
            searchKeyword: '',
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
        categories() {
            return this.$store.getters['head/head-middle/categories']
        },
    },
    methods: {
        logout() {
            /* this.$store.dispatch('auth/logout') */
            this.islogin = false
        },
        switchLanguage(code) {
            this.$i18n.setLocale(code)
            this.$store.dispatch('head/head-top/SET_CURRRENT_LANG_CODE', code)
        },
        onSearch() {
            console.log('搜尋觸發:', this.searchCategory, this.searchKeyword);
        },
  },
}
</script>

<template>
    <div>
        <Header
            :currentLang="currentLang"
            :languages="languages"
            :switchLanguage="switchLanguage"
            :islogin="islogin" 
            :logout="logout"
            :searchCategory.sync="searchCategory "
            :searchKeyword.sync="searchKeyword"
            :onSearch="onSearch"
            :categories="categories"
        />
        <HeaderMobile
            :currentLang="currentLang"
            :languages="languages"
            :switchLanguage="switchLanguage"
            :islogin="islogin"
            :logout="logout"
            :searchKeyword.sync="searchKeyword"
            :onSearch="onSearch"
            :categories="categories"
        />
        <main>
            <Nuxt />
        </main>
        <Footer />
    </div>
</template>

<style scoped>
</style>
