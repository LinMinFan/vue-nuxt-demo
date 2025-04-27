<script>
import { onSearch } from '@/helpers/tools'

export default {
    name: 'HeaderMiddle',
    props: {
        islogin: {
            type: Boolean,
            default: false
        },
        searchCategory: {
            type: String,
            default: 'all'
        },
        searchKeyword: {
            type: String,
            default: ''
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
    data() {
        return {

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
    },
    mounted() {
        this.waitForSelect2Ready().then(() => {
            this.initSelect2();
        });
    },
    methods: {
        waitForSelect2Ready() {
            return new Promise((resolve) => {
                const check = () => {
                    if (this.$refs.selectCategory && typeof $(this.$refs.selectCategory).select2 === 'function') {
                        console.log(`✅ Select2 is ready`);
                        resolve();
                    } else {
                        console.log(`⏳ Waiting for Select2...`);
                        setTimeout(check, 250);
                    }
                };
                check();
            });
        },
        initSelect2() {
            if (process.client) {
                this.$nextTick(() => {
                    try {
                        const selectElement = $(this.$refs.selectCategory);
                        if (selectElement) {
                            selectElement.select2( {
                                width: '50%',
                                allowClear: false,
                            });
                            selectElement.on('select2:select', (e) => {
                                this.$emit('update:searchCategory', e.params.data.id);
                            });
                            selectElement.val(this.searchCategory).trigger('change');
                        }
                    } catch (e) {
                        console.error('select2 initialization error:', e);
                    }
                });
            }
        },
        destroySelect2() {
            if (this.$refs.selectCategory) {
                $(this.$refs.selectCategory).off('select2:select').select2('destroy');
            }
        },
        handleSearch() {
            onSearch(this.searchCategory, this.searchKeyword)
        },
    },
    watch: {
        categories: {
            handler() {
                this.destroySelect2();
                this.initSelect2();
            },
            deep: true,
        },
        searchCategory(newVal) {
            $(this.$refs.selectCategory).val(newVal).trigger('change');
        }
    },
    beforeDestroy() {
        this.destroySelect2();
    }
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
                    <form action="#" @submit.prevent="handleSearch">
                        <select class="select-active" ref="selectCategory" id="selectCategory">
                            <option v-for="category in categories" :key="category.type" :value="category.type">
                                {{ category.name }}
                            </option>
                        </select>
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
                                <span class="pro-count blue">{{ cartData.length }}</span>
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
                                <img alt="wowy" src="/imgs/theme/icons/icon-user.svg" />
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>