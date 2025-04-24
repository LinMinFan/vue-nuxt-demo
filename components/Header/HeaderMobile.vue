<script>
export default {
    name: 'HeaderMobile',
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
        searchKeyword: {
            type: String,
            default: ''
        },
        onSearch: {
            type: Function,
            default: () => {}
        },
        categories: {
            type: Array,
            default: () => ([])
        },
    },
}
</script>

<template>
    <div class="mobile-header-active mobile-header-wrapper-style">
        <div class="mobile-header-wrapper-inner">
            <div class="mobile-header-top">
                <div class="mobile-header-logo">
                    <nuxt-link :to="`/${currentLang.code}`">
                        <img src="/imgs/theme/logo-default.png" alt="logo" />
                    </nuxt-link>
                </div>
                <div class="mobile-menu-close close-style-wrap close-style-position-inherit">
                    <button class="close-style search-close">
                        <i class="icon-top"></i>
                        <i class="icon-bottom"></i>
                    </button>
                </div>
            </div>
            <div class="mobile-header-content-area" @submit.prevent="onSearch">
                <div class="mobile-search search-style-3 mobile-header-border">
                    <form action="#" @submit.prevent="onSearch">
                        <input type="text" 
                            :value="searchKeyword"
                            @input="$emit('update:searchKeyword', $event.target.value)"
                            placeholder="查詢商品…" 
                        />
                        <button type="submit">
                            <i class="far fa-search"></i>
                        </button>
                    </form>
                </div>
                <div class="mobile-menu-wrap mobile-header-border">
                    <!-- mobile menu start -->
                    <nav>
                        <ul class="mobile-menu">
                            <li v-for="category in categories" class="menu-item-has-children">
                                <span class="menu-expand"></span>
                                <nuxt-link :to="`/${currentLang.code}/shop/${category.type ==='all' ? '' : category.type}`">
                                    {{ category.name }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                    <!-- mobile menu end -->
                </div>
                <div class="mobile-header-info-wrap mobile-header-border">
                    <div class="single-mobile-header-info">
                        <a class="mobile-language-active" href="#">
                            {{ currentLang.name }} 
                            <span>
                                <i class="far fa-angle-down"></i>
                            </span>
                        </a>
                        <div class="lang-curr-dropdown lang-dropdown-active">
                            <ul>
                                <li v-for="lang in languages" :key="lang.code">
                                    <a href="#" @click.prevent="switchLanguage(lang.code)" >
                                        {{ lang.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="single-mobile-header-info">
                        <a v-if="islogin" href="#" @click.prevent="logout()" class="mt-3" >登出</a>
                        <nuxt-link v-else :to="`/${currentLang.code}/auth/login`">
                            登入
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>