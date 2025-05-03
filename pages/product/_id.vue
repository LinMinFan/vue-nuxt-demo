<script>

export default {
    layout: 'default',
    async asyncData({ params, store, $axios }) {
        const { id } = params

        return {
            id,
        }
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
              '/js/plugins/jquery.elevatezoom.js',
              '/js/shop.js'
            ];

            scripts.forEach(src => {
              const script = document.createElement('script');
              script.src = src;
              script.async = false; // 若順序重要請設 false
              document.body.appendChild(script);
            });
        },
        addToCart(quantity = 1) {
            const product = this.currentProuduct;
            const productId = product.id;
            const refEl = this.$refs[`${productId}-qty`]
            let qty = quantity

            if (refEl) {
                qty = Number(refEl.innerText)
            }

            // 將產品物件轉換成購物車格式
            const cartItem = {
                id: product.id,
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

            console.log(qty)
        }
    },
    computed: {
        currentLang() {
            const code = this.$store.getters['head/head-top/currentLangCode']
            const lang = this.$store.getters['head/head-top/languages']
            return lang.find(l => l.code === code)
        },
        categoryMap() {
            return this.$store.getters['product/products/categoryMap']
        },
        allProducts() {
            return this.$store.getters['product/products/allProducts']
        },
        currentProuduct() {
            return this.allProducts.find(p => p.id === Number(this.id))
        },
        recommendedProducts() {
            return this.allProducts
                .filter(p => p.category === this.currentProuduct.category && p.id !== this.currentProuduct.id)
                .slice(0, 4);
        },
        cartData() {
            return this.$store.getters['cart/cart/cart']
        },
    },
    mounted() {
        this.loadProductScripts();
    },
    beforeDestroy() {
        $('.product-image-slider img').each(function () {
            $(this).removeData('elevateZoom');
            $(this).off('.elevateZoom'); // 解除相關事件
        });
        $('.zoomWindowContainer, .zoomContainer').remove(); // 移除殘留的容器
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
                    <span></span> {{ categoryMap[currentProuduct.category] }} <span></span> {{ currentProuduct.name }}
                </div>
            </div>
        </div>
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="product-detail accordion-detail">
                            <div class="row mb-50">
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div class="detail-gallery">
                                        <span class="zoom-icon"><i class="fa fa-search-plus"></i></span>
                                        <!-- MAIN SLIDES -->
                                        <div class="product-image-slider">
                                            <figure class="border-radius-10">
                                                <img :src="currentProuduct.default_img" alt="product image" />
                                            </figure>
                                            <figure class="border-radius-10">
                                                <img :src="currentProuduct.hover_img" alt="product image" />
                                            </figure>
                                        </div>
                                        <!-- THUMBNAILS -->
                                        <div class="slider-nav-thumbnails pl-15 pr-15">
                                            <div>
                                                <img :src="currentProuduct.default_img" alt="product image" />
                                            </div>
                                            <div>
                                                <img :src="currentProuduct.hover_img" alt="product image" />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End Gallery -->
                                </div>
                                <div class="col-md-6 col-sm-12 col-xs-12">
                                    <div class="detail-info">
                                        <h2 class="title-detail">{{ currentProuduct.name }}</h2>
                                        <div class="clearfix product-price-cover">
                                            <div class="product-price primary-color float-left">
                                                <ins>
                                                    <span class="text-brand">${{ currentProuduct.price }}</span>
                                                </ins>
                                                <ins>
                                                    <span class="old-price font-md ml-15">${{ currentProuduct.origin_price }}</span>
                                                </ins>
                                            </div>
                                        </div>
                                        <div class="bt-1 border-color-1 mt-15 mb-15"></div>
                                        <div class="short-desc mb-30">
                                            <p>
                                                商品簡介
                                            </p>
                                        </div>
                                        <div class="product_sort_info font-xs mb-30">
                                            <ul>
                                                <li class="mb-10"><i class="far fa-hourglass mr-5 text-brand"></i> 保固資訊 </li>
                                                <li class="mb-10"><i class="far fa-paper-plane mr-5 text-brand"></i> 退換貨說明</li>
                                                <li><i class="far fa-address-card mr-5 text-brand"></i> 付款方式</li>
                                            </ul>
                                        </div>
                                        <div class="attr-detail attr-size">
                                            <strong class="mr-10">Size</strong>
                                            <ul class="list-filter size-filter font-small">
                                                <li><a href="#">S</a></li>
                                                <li class="active"><a href="#">M</a></li>
                                                <li><a href="#">L</a></li>
                                                <li><a href="#">XL</a></li>
                                                <li><a href="#">XXL</a></li>
                                            </ul>
                                        </div>
                                        <div class="bt-1 border-color-1 mt-30 mb-30"></div>
                                        <div class="detail-extralink">
                                            <div class="detail-qty border radius">
                                                <a href="#" class="qty-down" >
                                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                                </a>
                                                <span class="qty-val" :ref="`${currentProuduct.id}-qty`">1</span>
                                                <a href="#" class="qty-up" >
                                                    <i class="fa fa-caret-up" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                            <div class="product-extra-link2">
                                                <button type="submit" class="button button-add-to-cart" @click="addToCart()">
                                                    {{ $t('add_to_cart') }}
                                                </button>
                                                <a :aria-label="$t('add_to_wishlist')" class="action-btn hover-up" href="#"><i class="far fa-heart"></i></a>
                                                <a :aria-label="$t('compare')" class="action-btn hover-up" href="#"><i class="far fa-exchange-alt"></i></a>
                                            </div>
                                        </div>
                                        <ul class="product-meta font-xs color-grey mt-50">
                                            <li class="mb-5">SKU: <span> {{ currentProuduct.id }}</span></li>
                                            <li>剩餘數量:<span class="in-stock text-success ml-5">{{ currentProuduct.stock }}</span></li>
                                        </ul>
                                    </div>
                                    <!-- Detail Info -->
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-10 m-auto entry-main-content">
                                    <h3 class="section-title style-1 mb-30">商品內容</h3>
                                    <div class="description mb-50">
                                        <p>
                                            商品描述1
                                        </p>
                                        <p>
                                            商品描述2
                                        </p>
                                        <ul class="product-more-infor mt-30">
                                            <li>
                                                <span>更多資訊</span> a
                                            </li>
                                            <li>
                                                <span>更多資訊</span> b
                                            </li>
                                            <li>
                                                <span>更多資訊</span> c
                                            </li>
                                            <li>
                                                <span>更多資訊</span> d
                                            </li>
                                        </ul>
                                        <hr class="wp-block-separator is-style-dots" />
                                        <p>
                                            補充說明
                                        </p>
                                    </div>
                                    <h3 class="section-title style-1 mb-30">商品規格</h3>
                                    <table class="font-md mb-30">
                                        <tbody>
                                            <tr class="stand-up">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                            <tr class="folded-wo-wheels">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                            <tr class="folded-w-wheels">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                            <tr class="door-pass-through">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                            <tr class="frame">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                            <tr class="weight-wo-wheels">
                                                <th>規格標題</th>
                                                <td>
                                                    <p>規格內容</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row mt-60">
                                <div class="col-12">
                                    <h3 class="section-title style-1 mb-30">推薦商品</h3>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 col-12 col-sm-6" v-for="item in recommendedProducts" :key="item.id">
                                        <div class="product-cart-wrap mb-30">
                                            <div class="product-img-action-wrap">
                                                <div class="product-img product-img-zoom">
                                                    <nuxt-link :to="`/${currentLang.code}/product/${item.id}`">
                                                        <img class="default-img" :src="item.default_img" alt="" />
                                                        <img class="hover-img" :src="item.hover_img" alt="" />
                                                    </nuxt-link>
                                                </div>
                                                <div class="product-action-1">
                                                    <a :aria-label="$t('quick_view')" class="action-btn hover-up">
                                                        <i class="far fa-search"></i>
                                                    </a>
                                                    <a :aria-label="$t('add_to_wishlist')" class="action-btn hover-up" href="#">
                                                        <i class="far fa-heart"></i>
                                                    </a>
                                                    <a :aria-label="$t('compare')" class="action-btn hover-up" href="#">
                                                        <i class="far fa-exchange-alt"></i>
                                                    </a>
                                                </div>
                                                <div class="product-badges product-badges-position product-badges-mrg">
                                                    <span class="hot">{{ item.badge }}</span>
                                                </div>
                                            </div>
                                            <div class="product-content-wrap">
                                                <div class="product-category">
                                                    <nuxt-link :to="`/${currentLang.code}/shop/${item.category}`">
                                                        {{ categoryMap[item.category] }}
                                                    </nuxt-link>
                                                </div>
                                                <h2>
                                                    <nuxt-link :to="`/${currentLang.code}/product/${item.id}`">
                                                        {{ item.name }}
                                                    </nuxt-link>
                                                </h2>
                                                <div class="product-price">
                                                    <span>${{ item.price }} </span>
                                                    <span class="old-price">${{ item.origin_price }}</span>
                                                </div>
                                                <div class="product-action-1 show">
                                                    <a :aria-label="$t('add_to_cart')" class="action-btn hover-up" href="#">
                                                        <i class="far fa-shopping-bag"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

</style>
