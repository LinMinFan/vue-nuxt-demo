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
        switchLanguage: {
            type: Function,
        },
        islogin: {
            type: Boolean,
            default: false
        },
        logout: {
            type: Function,
        },
        searchCategory: {
            type: String,
            default: 'all'
        },
        searchKeyword: {
            type: String,
            default: ''
        },
        onSearch: {
            type: Function,
        },
        categories: {
            type: Array,
            default: () => ([])
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
        cartData() {
            return this.$store.getters['cart/cart/cart']
        },
        totalPrice() {
            return this.cartData.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        },
    },
    mounted() {

    },
    methods: {
        removeItem(id) {
            this.cartData = this.cartData.filter(item => item.id !== id);
        },
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
            :switchLanguage="switchLanguage"
            :islogin="islogin"
            :logout="logout"
            :latestEvents="latestEvents"
            :discountPlan="discountPlan"
            :announcement="announcement"
        />
        <HeaderMiddle
            :islogin="islogin"
            :searchCategory="searchCategory"
            @update:searchCategory="$emit('update:searchCategory', $event)"
            :searchKeyword="searchKeyword"
            @update:searchKeyword="$emit('update:searchKeyword', $event)"
            :onSearch="onSearch"
            :currentLang="currentLang"
            :categories="categories"
            :cartData="cartData"
            :totalPrice="totalPrice"
            :removeItem="removeItem"
        />
        <HeaderBottom
            :islogin="islogin"
            :currentLang="currentLang"
            :categories="categories"
            :cartData="cartData"
            :totalPrice="totalPrice"
            :removeItem="removeItem"
        />
    </header>
</template>

<style scoped>

</style>
