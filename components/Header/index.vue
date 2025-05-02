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
        searchCategory: {
            type: String,
            default: 'all'
        },
        searchKeyword: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            
        }
    },
    computed: {
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
        removeItem(productId) {
            const data = this.cartData.filter(item => item.id !== productId);
            this.$store.dispatch('cart/cart/updatedCart', data);
        },
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
        />
        <HeaderMiddle
            :islogin="islogin"
            :searchCategory="searchCategory"
            @update:searchCategory="$emit('update:searchCategory', $event)"
            :searchKeyword="searchKeyword"
            @update:searchKeyword="$emit('update:searchKeyword', $event)"
            :cartData="cartData"
            :totalPrice="totalPrice"
            :removeItem="removeItem"
        />
        <HeaderBottom
            :islogin="islogin"
            :cartData="cartData"
            :totalPrice="totalPrice"
            :removeItem="removeItem"
        />
    </header>
</template>

<style scoped>

</style>
