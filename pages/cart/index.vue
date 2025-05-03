<script>

export default {
    layout: 'default',
    async asyncData({store, $axios}) {

        return {

        };
    },
    head() {

    },
    data() {
        return {
            quantities: {},
            subTotal: 0,
            isEmpty: false,
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
        changeQty(productId, option) {
            const refEl = this.$refs[`${productId}-qty`];
            const totalEl = this.$refs[`${productId}-total`];
            const product = this.cartData.find(p => p.id === productId);

            if (!this.quantities[productId]) {
                this.$set(this.quantities, productId, {});
            }
            
            let price = Number(product.price)

            let qty = this.quantities[productId]['qty']

            if (option === 'up') {
                qty = Number(qty) + 1;
            } else if (option === 'down') {
                if (qty - 1 == 0) {
                    qty = 1
                } else {
                    qty = Number(qty) - 1;
                }
            }

            let total = price * qty
            this.$set(this.quantities, productId, {
                qty,
                total,
            });

            this.$nextTick(() => {
                const refTarget = Array.isArray(refEl) ? refEl[0] : refEl;
                const totalTarget = Array.isArray(totalEl) ? totalEl[0] : totalEl;

                if (refTarget instanceof HTMLElement) {
                    refTarget.innerText = qty;
                }

                if (totalTarget instanceof HTMLElement) {
                    totalTarget.innerText = `$${price * qty}`;
                }
            });
        },
        removeItem(productId) {
            // 移除 cartData 中該項目
            const data = this.cartData.filter(item => item.id !== productId);
            this.$store.dispatch('cart/cart/updatedCart', data);

            // 移除 quantities 中對應項目
            if (this.quantities[productId]) {
                this.$delete(this.quantities, productId);
            }

            if (this.cartData.length === 0) {
                this.isEmpty = true
            }
        },
        clearCart() {
            // 移除 cartData 中該項目
            const data = []
            this.$store.dispatch('cart/cart/updatedCart', data);

            // 移除 quantities 中對應項目
            this.quantities = {}

            this.isEmpty = true
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
    },
    watch: {
        quantities: {
            handler(newVal) {
                let total = 0;
                Object.entries(newVal).forEach(([id, item]) => {
                    const qty = Number(item.qty || 0);
                    const price = Number(this.cartData.find(p => p.id == id)?.price || 0);
                    total += qty * price;
                });
                this.subTotal = total;
            },
            deep: true,
        }
    },
    mounted() {
        this.loadProductScripts();
        this.$nextTick(() => {
            this.cartData.forEach(item => {
                let qty = Number(item.quantity);
                let price = Number(item.price);

                // 初始化 quantities[item.id]
                if (!this.quantities[item.id]) {
                    this.$set(this.quantities, item.id, {});
                }
                this.quantities[item.id].qty = qty;
                this.quantities[item.id].total = qty * price;

                const refEl = this.$refs[`${item.id}-qty`];
                const totalEl = this.$refs[`${item.id}-total`];

                refEl[0].innerText = qty;
                totalEl[0].innerText = qty * price;
            });

            let total = 0;
            this.cartData.forEach(item => {
                const qty = this.quantities[item.id] ? this.quantities[item.id].qty : 1;
                const price = Number(item.price);
                total += qty * price;
            });

            this.subTotal = total;
        });
    },
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
                    <span></span> 購物車 <span></span> 確認訂單
                </div>
            </div>
        </div>
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive">
                            <table class="table shopping-summery text-center clean">
                                <thead>
                                    <tr class="main-heading">
                                        <th scope="col">商品圖</th>
                                        <th scope="col">商品名稱</th>
                                        <th scope="col">價格</th>
                                        <th scope="col">數量</th>
                                        <th scope="col">小計</th>
                                        <th scope="col">移除商品</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in cartData" :key="item.id">
                                        <td class="image product-thumbnail">
                                            <img :src="item.image" alt="#" />
                                        </td>
                                        <td class="product-des product-name">
                                            <p class="product-name">
                                                <nuxt-link :to="`/${currentLang.code}/product/${item.id}`">
                                                    {{  item.name }}
                                                </nuxt-link>
                                            </p>
                                        </td>
                                        <td class="price" data-title="Price">
                                            <span>${{ item.price }} </span>
                                        </td>
                                        <td class="text-center" data-title="Stock">
                                            <div class="detail-qty border radius m-auto">
                                                <a href="#" class="qty-down" @click.prevent="changeQty(item.id, 'down')">
                                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                                </a>
                                                <span class="qty-val" :ref="`${item.id}-qty`">
                                                    {{ quantities[item.id] ? quantities[item.id].qty : 1 }}
                                                </span>
                                                <a href="#" class="qty-up" @click.prevent="changeQty(item.id, 'up')">
                                                    <i class="fa fa-caret-up" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </td>
                                        <td class="text-right" data-title="Cart">
                                            <span :ref="`${item.id}-total`">
                                                ${{ quantities[item.id] ? quantities[item.id].total : 0 }} 
                                            </span>
                                        </td>
                                        <td class="action" data-title="Remove" @click="removeItem(item.id)">
                                            <a href="#" class="text-muted">
                                                <i class="fa fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" class="text-end" @click="clearCart()" v-if="!isEmpty">
                                            <a href="#" class="text-muted">
                                                <i class="fa fa-times-circle"></i> 清空購物車
                                            </a>
                                        </td>
                                        <td colspan="6" class="text-end" v-else>
                                            <a href="#" class="text-muted">
                                                <i class="fa fa-times-circle"></i> 購物車內沒有商品
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="cart-action text-end">
                            <nuxt-link :to="`/${currentLang.code}/shop`" class="btn btn-rounded">
                                <i class="far fa-cart-plus mr-5"></i>繼續購買
                            </nuxt-link>
                        </div>
                        <div class="divider center_icon mt-50 mb-50">
                            <i class="fa fa-gem"></i>
                        </div>
                        <div class="row mb-50">
                            <div class="col-lg-6 col-md-12">
                                <div class="heading_s1 mb-3">
                                    <h4>送貨資訊</h4>
                                </div>
                                <p class="mt-15 mb-30">宅配 <span class="font-xl text-brand fw-900">$150</span></p>
                                <form class="field_form shipping_calculator">
                                    <div class="form-row">
                                        <div class="form-group col-lg-12">
                                            <div class="custom_select">
                                                <select class="form-control select-active">
                                                    <option value="">縣市</option>
                                                    <option value="1">基隆市</option>
                                                    <option value="2">臺北市</option>
                                                    <option value="3">新北市</option>
                                                    <option value="4">桃園縣</option>
                                                    <option value="5">新竹市</option>
                                                    <option value="6">新竹縣</option>
                                                    <option value="7">苗栗縣</option>
                                                    <option value="8">臺中市</option>
                                                    <option value="9">彰化縣</option>
                                                    <option value="10">南投縣</option>
                                                    <option value="11">雲林縣</option>
                                                    <option value="12">嘉義市</option>
                                                    <option value="13">嘉義縣</option>
                                                    <option value="14">臺南市</option>
                                                    <option value="15">高雄市</option>
                                                    <option value="16">屏東縣</option>
                                                    <option value="17">臺東縣</option>
                                                    <option value="18">花蓮縣</option>
                                                    <option value="19">宜蘭縣</option>
                                                    <option value="20">澎湖縣</option>
                                                    <option value="21">金門縣</option>
                                                    <option value="22">連江縣</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row row">
                                        <div class="form-group col-lg-6">
                                            <input required="required" placeholder="鄉鎮市區" name="name" type="text" />
                                        </div>
                                        <div class="form-group col-lg-6">
                                            <input required="required" placeholder="地址" name="name" type="text" />
                                        </div>
                                    </div>
                                </form>
                                <div class="mb-30 mt-50">
                                    <div class="heading_s1 mb-3">
                                        <h4>優惠券</h4>
                                    </div>
                                    <div class="total-amount">
                                        <div class="left">
                                            <div class="coupon">
                                                <form>
                                                    <div class="form-row row justify-content-center">
                                                        <div class="form-group col-lg-6">
                                                            <input class="font-medium" name="Coupon" placeholder="優惠代碼" />
                                                        </div>
                                                        <div class="form-group col-lg-6">
                                                            <a href="#" type="button" class="btn btn-rounded btn-sm">
                                                                <i class="far fa-bookmark mr-5"></i>使用優惠券
                                                            </a>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="border p-md-4 p-30 border-radius-10 cart-totals">
                                    <div class="heading_s1 mb-3">
                                        <h4>Cart Totals</h4>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td class="cart_total_label">購物車小計</td>
                                                    <td class="cart_total_amount">
                                                        <span class="font-lg fw-900 text-brand">
                                                            ${{ subTotal }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cart_total_label">運費</td>
                                                    <td class="cart_total_amount"><i class="ti-gift mr-5"></i> $150</td>
                                                </tr>
                                                <tr>
                                                    <td class="cart_total_label">總計</td>
                                                    <td class="cart_total_amount">
                                                        <strong>
                                                            <span class="font-xl fw-900 text-brand">
                                                                ${{ subTotal + 150 }}
                                                            </span>
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nuxt-link :to="`/${currentLang.code}/cart/checkout`" class="btn btn-rounded">
                                        <i class="fa fa-share-square mr-10"></i> 前往結帳
                                    </nuxt-link>
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
