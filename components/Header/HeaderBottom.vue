<script>
export default {
    name: 'HeaderBottom',
    props: {
        currentLang: {
            type: Object,
            default: () => ({})
        },
        categories: {
            type: Array,
            default: () => ([])
        },
    },
}
</script>

<template>
    <div class="header-bottom header-bottom-bg-color sticky-bar gray-bg sticky-blue-bg">
        <div class="container">
            <div class="header-wrap header-space-between position-relative">
                <div class="logo logo-width-1 d-block d-lg-none">
                    <a href="index.html">
                        <img src="assets/imgs/theme/logo-white.png" alt="logo" />
                    </a>
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
                            <a href="shop-wishlist.html">
                                <img alt="wowy" src="assets/imgs/theme/icons/icon-heart-white.svg" />
                                <span class="pro-count white">4</span>
                            </a>
                        </div>
                        <div class="header-action-icon-2">
                            <a class="mini-cart-icon" href="shop-cart.html">
                                <img alt="wowy" src="assets/imgs/theme/icons/icon-cart-white.svg" />
                                <span class="pro-count white">02</span>
                            </a>
                            <div class="cart-dropdown-wrap cart-dropdown-hm2">
                                <ul>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="shop-product-right.html"><img alt="wowy" src="assets/imgs/shop/thumbnail-3.jpg" /></a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4><a href="shop-product-right.html">Apple Watch Serial 7</a></h4>
                                            <h3><span>1 × </span>$800.00</h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#"><i class="far fa-times"></i></a>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="shopping-cart-img">
                                            <a href="shop-product-right.html"><img alt="wowy" src="assets/imgs/shop/thumbnail-4.jpg" /></a>
                                        </div>
                                        <div class="shopping-cart-title">
                                            <h4><a href="shop-product-right.html">Macbook Pro 2022</a></h4>
                                            <h3><span>1 × </span>$3500.00</h3>
                                        </div>
                                        <div class="shopping-cart-delete">
                                            <a href="#"><i class="far fa-times"></i></a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="shopping-cart-footer">
                                    <div class="shopping-cart-total">
                                        <h4>Total <span>$383.00</span></h4>
                                    </div>
                                    <div class="shopping-cart-button">
                                        <a href="shop-cart.html">View cart</a>
                                        <a href="shop-checkout.html">Checkout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-action-icon-2">
                            <a href="page-login-register.html">
                                <img alt="wowy" src="assets/imgs/theme/icons/icon-user-white.svg" />
                            </a>
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