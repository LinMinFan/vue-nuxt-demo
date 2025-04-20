<script>

export default {
    name: 'Header',
    props: {
        islogin: {
            type: Boolean,
            default: false
        },
        logout: {
            type: Function,
        },
    },
    data() {

        return {

        }
    },
    computed: {
        // 從 Vuex store 中獲取資料
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
        languages () {
            const lang = this.$store.getters['head/head-top/languages']
            return lang.filter(l => l.code !== this.currentLang.code)
        },
        latestEvents() {
            return this.$store.getters['head/head-top/latestEvents']
        },
        discountPlan() {
            return this.$store.getters['head/head-top/discountPlan']
        },
        announcement() {
            return this.$store.getters['head/head-top/announcement']
        },
    },
    mounted() {

    },
    methods: {

    },
    watch: {

    },
}
</script>

<template>
    <header class="header-area header-height-2">
        <HeaderTop 
            :islogin="islogin"
            :logout="logout"
            :currentLang="currentLang"
            :languages="languages"
            :latestEvents="latestEvents"
            :discountPlan="discountPlan"
            :announcement="announcement"
        />
        <HeaderMiddle
            :islogin="islogin"
            :currentLang="currentLang"
        />
    </header>
</template>

<style scoped>

</style>
