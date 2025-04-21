<script>

export default {
    name: 'Header',
    props: {
        currentLang: {
            type: Object,
            default: () => ({})
        },
        languages: {
            type: Array,
            default: () => ([])
        },
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
        :currentLang="currentLang"
        :languages="languages"
            :islogin="islogin"
            :logout="logout"
            :latestEvents="latestEvents"
            :discountPlan="discountPlan"
            :announcement="announcement"
        />
        <HeaderMiddle
            :islogin="islogin"
            :currentLang="currentLang"
        />
        <HeaderBottom
            :islogin="islogin"
            :currentLang="currentLang"
        />
    </header>
</template>

<style scoped>

</style>
