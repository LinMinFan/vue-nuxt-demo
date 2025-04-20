<script>
export default {
    name: 'HeaderMiddle',
    props: {
        currentLang: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            selectedCategory: 'all',     // 綁定 select
            searchKeyword: '',        // 綁定 input
        }
    },
    computed: {
        categories() {
            return this.$store.getters['head/head-middle/categories']
        }
    },
    mounted() {
        const vm = this
        document.getElementById('selectCategory').addEventListener('change', function (event) {
            vm.selectedCategory = event.target.value
        })
    },
    methods: {
        onSearch() {
            console.log('搜尋類別:', this.selectedCategory)
            console.log('關鍵字:', this.searchKeyword)
        },
    },
    watch: {

    },
}
</script>

<template>
    <div class="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div class="container">
            <div class="header-wrap header-space-between">
                <div class="logo logo-width-1">
                    <nuxt-link :to="`/${currentLang.code}`">
                        <img src="/imgs/theme/logo-default.png" alt="logo" />
                    </nuxt-link>
                </div>
                <div class="search-style-2">
                    <form action="#" @submit.prevent="onSearch">
                        <select class="select-active" id="selectCategory">
                            <option v-for="category in categories" :key="category.type" :value="category.type">
                                {{ category.name }}
                            </option>
                        </select>
                        <input type="text" v-model="searchKeyword" placeholder="查詢商品…" />
                        <button type="submit">
                            <i class="far fa-search"></i>
                        </button>
                    </form>
                </div>
                <div class="header-action-right">
                    <div class="header-action-2">
                        <div class="header-action-icon-2">
                            <nuxt-link :to="`/${currentLang.code}/member/wishlist`">
                                <img class="svgInject" alt="wowy" src="/imgs/theme/icons/icon-heart.svg" />
                                <span class="pro-count blue">4</span>
                            </nuxt-link>
                        </div>
                        <div class="header-action-icon-2">
                            <nuxt-link class="mini-cart-icon" :to="`/${currentLang.code}/cart`" >
                                <img alt="wowy" src="/imgs/theme/icons/icon-cart.svg" />
                                <span class="pro-count blue">2</span>
                            </nuxt-link>
                            <div class="cart-dropdown-wrap cart-dropdown-hm2">
                                <ul>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="shop-product-right.html">
                                                <img alt="wowy" src="/imgs/shop/thumbnail-3.jpg" />
                                            </a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4>
                                                <a href="shop-product-right.html">Apple Watch Serial 7</a>
                                            </h4>
                                            <h3>
                                                <span>1 × </span> $800.00
                                            </h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#">
                                                <i class="far fa-times"></i>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="shop-product-right.html">
                                                <img alt="wowy" src="/imgs/shop/thumbnail-1.jpg" />
                                            </a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4>
                                                <a href="shop-product-right.html">Macbook Pro 2022</a>
                                            </h4>
                                            <h3>
                                                <span>1 × </span> $3200.00
                                            </h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#"><i class="far fa-times"></i></a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="shopping-cart-footer">
                                    <div class="shopping-cart-total">
                                        <h4>
                                            Total <span>$4000.00</span>
                                        </h4>
                                    </div>
                                    <div class="shopping-cart-button">
                                        <nuxt-link :to="`/${currentLang.code}/cart`">
                                            查看購物車
                                        </nuxt-link>
                                        <nuxt-link :to="`/${currentLang.code}/cart/checkout`">
                                            確認結帳
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-action-icon-2">
                            <nuxt-link :to="`/${currentLang.code}/member`">
                                <img alt="wowy" src="/imgs/theme/icons/icon-user.svg" />
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>