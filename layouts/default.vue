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
        
    },
    methods: {
        logout() {
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
            :searchCategory.sync="searchCategory"
            :searchKeyword.sync="searchKeyword"
        />
        <HeaderMobile
            :islogin="islogin"
            :logout="logout"
            :searchCategory.sync="searchCategory"
            :searchKeyword.sync="searchKeyword"
        />
        <main>
            <Nuxt />
        </main>
        <Footer />
        <Preloader />
    </div>
</template>

<style scoped>
</style>
