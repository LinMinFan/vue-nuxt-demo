<script>
export default {
    name: 'HeaderBottom',
    props: {
        islogin: {
            type: Boolean,
            default: false
        },
        cartData: {
            type: Array,
            default: () => ([])
        },
        totalPrice: {
            type: Number,
            default: 0
        },
        removeItem: {
            type: Function,
            default: () => {}
        }
    },
    computed: {
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
        categories() {
            return this.$store.getters['head/head-middle/categories']
        },
    }
}
</script>

<template>
    <div class="header-bottom header-bottom-bg-color sticky-bar gray-bg sticky-blue-bg">
        <div class="container">
            <div class="header-wrap header-space-between position-relative">
                <div class="logo logo-width-1 d-block d-lg-none">
                    <nuxt-link :to="`/${currentLang.code}`">
                        <img src="/imgs/theme/logo-white.png" alt="logo" />
                    </nuxt-link>
                </div>
                <div class="main-categori-wrap d-none d-lg-block">
                    <a class="categori-button-active" href="#"> 
                        <span class="fa fa-list"></span> {{ $t('select_categories') }} 
                        <i class="down far fa-chevron-down"></i> 
                        <i class="up far fa-chevron-up"></i> 
                    </a>
                    <div class="categori-dropdown-wrap categori-dropdown-active-large">
                        <ul>
                            <li v-for="category in categories">
                                <nuxt-link :to="`/${currentLang.code}/shop/${category.type ==='all' ? '' : category.type}`">
                                    <i :class="category.icon"></i>{{ category.name }}
                                </nuxt-link>
                            </li>
                        </ul>
                        <div class="more_categories">{{ $t('show_more') }}...</div>
                    </div>
                </div>
                <div class="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block main-menu-light-white hover-boder hover-boder-white">
                    <nav>
                        <ul>
                            <li>
                                <nuxt-link :to="`/${currentLang.code}`" class="active">
                                    {{ $t('home') }}
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link :to="`/${currentLang.code}/shop`">
                                    {{ $t('shop') }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="hotline d-none d-lg-block">
                </div>
                <div class="header-action-right d-block d-lg-none">
                    <div class="header-action-2">
                        <div class="header-action-icon-2">
                            <nuxt-link :to="`/${currentLang.code}/member/wishlist`" class="mini-cart-icon">
                                <img class="wowy" alt="wowy" src="/imgs/theme/icons/icon-heart-white.svg" />
                                <span class="pro-count white">4</span>
                            </nuxt-link>
                        </div>
                        <div class="header-action-icon-2">
                            <nuxt-link class="mini-cart-icon" :to="`/${currentLang.code}/cart`" >
                                <img alt="wowy" src="/imgs/theme/icons/icon-cart-white.svg" />
                                <span class="pro-count white">{{ cartData.length }}</span>
                            </nuxt-link>
                            <div class="cart-dropdown-wrap cart-dropdown-hm2">
                                <ul>
                                    <li v-for="item in cartData" :key="item.id">
                                        <div class="shopping-cart-img">
                                            <nuxt-link :to="`/${currentLang.code}/shop/${item.id}`">
                                                <img alt="wowy" :src="item.image" />
                                            </nuxt-link>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4>
                                                <nuxt-link :to="`/${currentLang.code}/shop/${item.id}`">
                                                    {{ item.name }}
                                                </nuxt-link>
                                            </h4>
                                            <h3>
                                                <span>{{ item.quantity }} × </span> ${{ item.price*item.quantity }}
                                            </h3>
                                        </div>
                                        <div class="shopping-cart-delete" @click.prevent="removeItem(item.id)">
                                            <a href="#">
                                                <i class="far fa-times"></i>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="shopping-cart-footer">
                                    <div class="shopping-cart-total">
                                        <h4>
                                            Total <span>$ {{ totalPrice }}</span>
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
                                <img alt="wowy" src="/imgs/theme/icons/icon-user-white.svg" />
                            </nuxt-link>
                        </div>
                        <div class="header-action-icon-2 d-block d-lg-none">
                            <div class="burger-icon burger-icon-white">
                                <span class="burger-icon-top"></span>
                                <span class="burger-icon-mid"></span>
                                <span class="burger-icon-bottom"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>