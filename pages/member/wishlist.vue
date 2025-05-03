<script>

export default {
    layout: 'default',
    async asyncData({store, $axios}) {

    },
    head() {

    },
    data() {
        return {
        }
    },
    methods: {
        loadProductScripts() {
            const scripts = [
              '/js/plugins/jquery.theia.sticky.js',
            ];

            scripts.forEach(src => {
              const script = document.createElement('script');
              script.src = src;
              script.async = false; // 若順序重要請設 false
              document.body.appendChild(script);
            });
        },
        addToCart(product, quantity = 1) {
            const productId = product.id;
            let qty = quantity

            // 將產品物件轉換成購物車格式
            const cartItem = {
                id: productId,
                name: product.name,
                price: product.price,
                image: product.default_img,
                quantity: qty
            };

            // 檢查是否已存在購物車
            const existing = this.cartData.find(item => item.id === productId);
            let newCartData = [];

            if (existing) {
                newCartData = this.cartData.map(item => {
                    if (item.id === productId) {
                        const newQty = (item.quantity || 0) + qty; // 合併數量
                        return {
                            ...item,
                            quantity: newQty
                        };
                    }
                    return item;
                });
            } else {
                // 若是購物車中沒有此商品，則加入購物車
                newCartData = [
                    ...this.cartData,
                    cartItem
                ];
            }

            // 更新購物車資料到 Vuex
            this.$store.dispatch('cart/cart/updatedCart', newCartData);
        },
        removeWishItem(productId) {
            // 移除 wishlist 中該項目
            const data = this.wishlist.filter(item => item.id !== productId);
            this.$store.dispatch('member/wishlist/updatedWishlist', data);
        },
    },
    computed: {
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
        cartData() {
            return this.$store.getters['cart/cart/cart']
        },
        wishlist() {
            return this.$store.getters['member/wishlist/wishlist']
        },
    },
    mounted() {
        this.loadProductScripts();
    }
}
</script>

<template>
    <main class="main">
        <div class="page-header breadcrumb-wrap">
            <div class="container">
                <div class="breadcrumb">
                    <nuxt-link :to="`/${currentLang.code}`" rel="nofollow">
                        {{ $t('home') }}
                    </nuxt-link>
                    <span></span> 會員中心 <span></span> 追蹤商品
                </div>
            </div>
        </div>
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table shopping-summery text-center">
                                <thead>
                                    <tr class="main-heading">
                                        <th scope="col" colspan="2">商品</th>
                                        <th scope="col">價格</th>
                                        <th scope="col">加入購物車</th>
                                        <th scope="col">移除商品</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in wishlist" :key="item.id">
                                        <td class="image product-thumbnail">
                                            <img :src="item.default_img" alt="" />
                                        </td>
                                        <td class="product-des product-name">
                                            <p class="product-name">
                                                <nuxt-link :to="`/${currentLang.code}/product/${item.id}`">
                                                    {{ item.name }}
                                                </nuxt-link>
                                            </p>
                                        </td>
                                        <td class="price" data-title="Price">
                                            <span>{{ item.price }} </span>
                                        </td>
                                        <td class="text-center" data-title="Cart">
                                            <button class="btn btn-rounded btn-sm" @click="addToCart(item, 1)">
                                                <i class="far fa-shopping-bag mr-5"></i> 加入
                                            </button>
                                        </td>
                                        <td class="action" data-title="Remove">
                                            <a href="#" @click.prevent="removeWishItem(item.id)">
                                                <i class="fa fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

</style>