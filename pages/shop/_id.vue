<script>

export default {
    layout: 'default',
    async asyncData({store, $axios}) {

    },
    head() {

    },
    data() {
        return {
            currentPage: 1,
            pageSize: 3,
            pageSizeOptions: [3, 5, 10, 20],
            sortKey: 'featured',
            dropdowns: {
                pageSize: false,
                sort: false,
            },
        }
    },
    methods: {
        countByCategory(type) {
            let count = 0;
            const products = this.allProducts;

            if (type === 'all') {
                count = products.length
            } else {
                count = products.filter((product) => {
                    return product.category === type
                }).length
            }
            
            return count
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        changePageSize(size) {
            this.pageSize = size;
            this.currentPage = 1; // 換每頁數量時，回到第一頁
        },
        toggleDropdown(type) {
            this.dropdowns[type] = !this.dropdowns[type];
            // 關閉其他 dropdown
            Object.keys(this.dropdowns).forEach(key => {
                if (key !== type) this.dropdowns[key] = false;
            });
        },
        handleClickOutside(event) {
            const refs = {
                pageSize: [this.$refs.pageSizeWrap, this.$refs.pageSizeDropdown],
                sort: [this.$refs.sortWrap, this.$refs.sortDropdown],
            };
            for (const [key, [wrap, dropdown]] of Object.entries(refs)) {
                if (
                    wrap && dropdown &&
                    !wrap.contains(event.target) &&
                    !dropdown.contains(event.target)
                ) {
                    this.dropdowns[key] = false;
                }
            }
        },
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
        categoryId() {
            if (this.$route.params.id === 'all') {
                return 0
            } else {
                return Number(this.$route.params.id)
            }           
        },
        allProducts() {
            return this.$store.getters['product/products/allProducts']
        },
        productsByCategory() {
            const products = [...this.allProducts];
            if (this.categoryId === 0) {
                return products
            } else {
                return products.filter((product) => { 
                    return product.category === this.categoryId
            });
            }
        },
        categoryMap() {
            return this.$store.getters['product/products/categoryMap']
        },
        getSortText() {
            switch (this.sortKey) {
                case 'priceAsc':
                    return '價錢低到高';
                case 'priceDesc':
                    return '價錢高到低';
                default:
                    return '精選';
            }
        },
        sortIcon() {
            switch (this.sortKey) {
                case 'priceAsc':
                    return 'fa fa-sort-amount-up'; // 價錢低到高的排序 icon
                case 'priceDesc':
                    return 'fa fa-sort-amount-down'; // 價錢高到低的排序 icon
                default:
                    return 'fa fa-star'; // 預設的 icon
            }
        },
        sortedProducts() {
            const products = [...this.productsByCategory]; // 複製避免修改原資料

            switch (this.sortKey) {
                case 'priceAsc':
                    return products.sort((a, b) => a.price - b.price);
                case 'priceDesc':
                    return products.sort((a, b) => b.price - a.price);
                default:
                    return products.sort((a, b) => {
                        // 排序規則：將 tab 是 featured 的商品排到前面
                        if (a.tab === 'featured' && b.tab !== 'featured') {
                          return -1; // a 在 b 前面
                        }
                        if (a.tab !== 'featured' && b.tab === 'featured') {
                          return 1;  // b 在 a 前面
                        }
                        return 0; // 如果兩者都是 featured 或都不是 featured，則不改動順序
                    });
            }
        },
        totalPages() {
            return Math.max(1, Math.ceil(this.sortedProducts.length / this.pageSize));
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.sortedProducts.slice(start, end);
        },
        visiblePages() {
            const pages = new Set();

            // 固定顯示第一頁與最後一頁
            pages.add(1);
            pages.add(this.totalPages);

            // 加入前一頁、當前頁、後一頁
            if (this.currentPage > 1) pages.add(this.currentPage - 1);
            pages.add(this.currentPage);
            if (this.currentPage < this.totalPages) pages.add(this.currentPage + 1);

            // 排序
            return Array.from(pages).sort((a, b) => a - b);
        },
        pageSections() {
            const result = [];
            const pages = this.visiblePages;

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                result.push({ type: 'page', value: page });
                
                if (i < pages.length - 1 && pages[i + 1] - page > 1) {
                  result.push({ type: 'ellipsis' });
                }
            }
            return result;
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
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
                    <span></span> {{ $t('shop') }}
                </div>
            </div>
        </div>
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <div class="shop-product-fillter">
                            <div class="totall-product">
                                <p>找到 <strong class="text-brand">{{ productsByCategory.length }}</strong> 件商品</p>
                            </div>
                            <div class="sort-by-product-area">
                                <div class="sort-by-cover mr-10">
                                    <div class="sort-by-product-wrap">
                                        <div class="sort-by">
                                            <span><i class="fa fa-th"></i>顯示:</span>
                                        </div>
                                        <div class="sort-by-dropdown-wrap" ref="pageSizeWrap" @click="toggleDropdown('pageSize')">
                                            <span>{{ pageSize }} <i class="far fa-angle-down"></i></span>
                                        </div>
                                    </div>
                                    <div class="sort-by-dropdown" :class="{ show: dropdowns.pageSize }" ref="pageSizeDropdown">
                                        <ul>
                                            <li v-for="size in pageSizeOptions" :key="size">
                                                <a
                                                    :class="{ active: pageSize === size }"
                                                    href="#"
                                                    @click.prevent="changePageSize(size)"
                                                >
                                                    {{ size }}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="sort-by-cover">
                                    <div class="sort-by-product-wrap">
                                        <div class="sort-by">
                                            <span><i :class="sortIcon"></i>排序:</span>
                                        </div>
                                        <div class="sort-by-dropdown-wrap" ref="sortWrap" @click="toggleDropdown('sort')">
                                            <span> {{ getSortText }} <i class="far fa-angle-down"></i></span>
                                        </div>
                                    </div>
                                    <div class="sort-by-dropdown" :class="{ show: dropdowns.sort }" ref="sortDropdown">
                                        <ul>
                                            <li>
                                                <a :class="{ active: sortKey === 'featured' }" href="#" @click.prevent="sortKey = 'featured'">精選</a>
                                            </li>
                                            <li>
                                                <a :class="{ active: sortKey === 'priceAsc' }" href="#" @click.prevent="sortKey = 'priceAsc'">價錢低到高</a>
                                            </li>
                                            <li>
                                                <a :class="{ active: sortKey === 'priceDesc' }" href="#" @click.prevent="sortKey = 'priceDesc'">價錢高到低</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row product-grid-3">
                            <div 
                                class="col-lg-4 col-md-4 col-12 col-sm-6"
                                v-for="product in paginatedProducts"
                                :key="product.id"
                            >
                                <div class="product-cart-wrap mb-30">
                                    <div class="product-img-action-wrap">
                                        <div class="product-img product-img-zoom">
                                            <nuxt-link :to="`/${currentLang.code}/product/${product.id}`">
                                                <img class="default-img" :src="product.default_img" alt="" />
                                                <img class="hover-img" :src="product.hover_img" alt="" />
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
                                            <span class="best">{{ product.badge }}</span>
                                        </div>
                                    </div>
                                    <div class="product-content-wrap">
                                        <div class="product-category">
                                            <nuxt-link :to="`/${currentLang.code}/shop/${product.category}`">
                                                {{ categoryMap[product.category] }}
                                            </nuxt-link>
                                        </div>
                                        <h2>
                                            <nuxt-link :to="`/${currentLang.code}/product/${product.id}`">
                                                {{ product.name }}
                                            </nuxt-link>
                                        </h2>
                                        <div class="product-price">
                                            <span>${{ product.price }} </span>
                                            <span class="old-price">${{ product.origin_price }}</span>
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
                        <!--pagination-->
                        <div class="pagination-area mt-15 mb-md-5 mb-lg-0">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-start">
                                    <!-- 上一頁 -->
                                    <li class="page-item" v-if="currentPage > 1">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                            <i class="fa fa-angle-left"></i>
                                        </a>
                                    </li>
                                    <!-- 分頁與省略號 -->
                                    <li
                                        v-for="(item, index) in pageSections"
                                        :key="index"
                                        :class="['page-item', { active: item.type === 'page' && item.value === currentPage }]"
                                    >
                                        <a
                                            v-if="item.type === 'page'"
                                            class="page-link"
                                            href="#"
                                            @click.prevent="changePage(item.value)"
                                        >
                                            {{ String(item.value).padStart(2, '0') }}
                                        </a>
                                        <span v-else class="page-link dot">...</span>
                                    </li>
                                    <!-- 下一頁 -->
                                    <li class="page-item" v-if="currentPage < totalPages">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-3 primary-sidebar">
                        <div class="widget-area">
                            <!--Widget categories-->
                            <div class="sidebar-widget widget_categories mb-30 p-30 bg-grey border-radius-10">
                                <div class="widget-header position-relative mb-20 pb-10">
                                    <h5 class="widget-title mb-10">類別</h5>
                                    <div class="bt-1 border-color-1"></div>
                                </div>
                                <div class="">
                                    <ul class="categor-list">
                                        <li 
                                            class="cat-item text-muted" 
                                            v-for="category in categories"
                                            :key="category.id"
                                        >
                                            <nuxt-link :to="`/${currentLang.code}/shop/${category.type}`">
                                                {{ category.name }}
                                            </nuxt-link>
                                            ({{ countByCategory(category.type) }})
                                        </li>
                                    </ul>
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
