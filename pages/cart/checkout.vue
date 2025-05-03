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
                    <span></span> 購物車 <span></span> 確認結帳
                </div>
            </div>
        </div>
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="order_review">
                            <div class="mb-20">
                                <h4>訂單明細</h4>
                            </div>
                            <div class="table-responsive order_table text-center">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th colspan="2">Product</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in cartData" :key="item.id">
                                            <td class="image product-thumbnail">
                                                <img :src="item.image" alt="#" />
                                            </td>
                                            <td>
                                                <nuxt-link :to="`/${currentLang.code}/product/${item.id}`">
                                                    {{  item.name }}
                                                </nuxt-link>
                                                <span>X </span>
                                                <span class="product-qty" :ref="`${item.id}-qty`">
                                                    {{ quantities[item.id] ? quantities[item.id].qty : 1 }}
                                                </span>
                                            </td>
                                            <td :ref="`${item.id}-total`">
                                                ${{ quantities[item.id] ? quantities[item.id].total : 0 }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>小計</th>
                                            <td class="product-subtotal" colspan="2">
                                                ${{ subTotal }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>運費</th>
                                            <td colspan="2"><em>$150</em></td>
                                        </tr>
                                        <tr>
                                            <th>總額</th>
                                            <td colspan="2" class="product-subtotal">
                                                <span class="font-xl text-brand fw-900">
                                                    ${{ subTotal + 150 }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="bt-1 border-color-1 mt-30 mb-30"></div>
                            <div class="payment_method text-end">
                                <a href="https://learnandgrow.com.tw/ecpay/test" class="btn btn-fill-out mt-30">
                                    前往付款
                                </a>
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
