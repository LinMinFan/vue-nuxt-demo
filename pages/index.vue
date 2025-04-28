<script>
import debounce from 'lodash/debounce';

export default {
    layout: 'default',
    async asyncData({store, $axios}) {

        return {

        }
    },
    head() {
        return {
            title: 'vue + nuxt 首頁'
        }
    },
    data() {

        return {
            slickOptions: {
                dots: true,
                infinite: true,
                speed: 3000,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoplay: true,
                appendDots: '.dot-style-1',
                appendArrows: '.hero-slider-1-arrow',
                prevArrow: '<span class="slider-btn slider-prev slick-arrow"><i class="far fa-chevron-left"></i></span>',
                nextArrow: '<span class="slider-btn slider-next slick-arrow"><i class="far fa-chevron-right"></i></span>',
            },
            carouseOptions: {
                infinite: true,
                slidesToShow: 6, // 初始顯示6個
                slidesToScroll: 1, // 每次滑動6個（也可以改成1，看你要的感覺）
                arrows: true, // 顯示左右箭頭
                autoplay: false, // 不自動輪播
                appendArrows: '.categories-carausel-arrow',
                prevArrow: '<span class="slider-btn slider-prev slick-arrow" style=""><i class="far fa-chevron-left"></i></span>',
                nextArrow: '<span class="slider-btn slider-next slick-arrow" style=""><i class="far fa-chevron-right"></i></span>',
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 6 } },
                    { breakpoint: 992,  settings: { slidesToShow: 6 } },
                    { breakpoint: 768,  settings: { slidesToShow: 4 } },
                    { breakpoint: 480,  settings: { slidesToShow: 2 } }
                ]
            },
            brandOptions: {
                infinite: true,
                slidesToShow: 6, // 初始顯示6個
                slidesToScroll: 1, // 每次滑動6個（也可以改成1，看你要的感覺）
                arrows: true, // 顯示左右箭頭
                autoplay: false, // 不自動輪播
                appendArrows: '.categories-brand-arrow',
                prevArrow: '<span class="slider-btn slider-prev slick-arrow" style=""><i class="far fa-chevron-left"></i></span>',
                nextArrow: '<span class="slider-btn slider-next slick-arrow" style=""><i class="far fa-chevron-right"></i></span>',
                responsive: [
                    { breakpoint: 1200, settings: { slidesToShow: 6 } },
                    { breakpoint: 992,  settings: { slidesToShow: 6 } },
                    { breakpoint: 768,  settings: { slidesToShow: 4 } },
                    { breakpoint: 480,  settings: { slidesToShow: 2 } }
                ]
            },
        }
    },
    methods: {
        waitForSlickReady() {
            return new Promise((resolve) => {
                const check = () => {
                    if (typeof $(this.$refs.sliderContainer).slick === 'function') {
                        console.log('✅ Slick is ready!');
                        resolve();
                    } else {
                        console.log('⏳ Waiting for slick...');
                        setTimeout(check, 250); // 每 250ms 檢查一次
                    }
                };
                check();
            });
        },
        initSlider() {
            if (process.client) {
                this.$nextTick(() => {
                    try {
                        const sliderElement = this.$refs.sliderContainer;
                        if (sliderElement && $(sliderElement).length) {
                            // 如果已經初始化，先銷毀
                            if ($(sliderElement).hasClass('slick-initialized')) {
                                $(sliderElement).slick('unslick');
                            }
                            
                            // 創建新的選項對象，避免修改原始對象
                            const options = this.slickOptions;

                            // 重新初始化
                            $(sliderElement).slick(options);
                            console.log('Slider initialized');
                        }
                    } catch (e) {
                        console.error('Slider initialization error:', e);
                    }
                });
            }
        },
        debounceInitSlider: debounce(function() {
            this.initSlider();
        }, 500),
        waitForCategoriesCarouselReady() {
            return new Promise((resolve) => {
                const check = () => {
                    if (this.$refs.categoriesCarousel && typeof $(this.$refs.categoriesCarousel).slick === 'function') {
                        console.log(`✅ categoriesCarousel is ready`);
                        resolve();
                    } else {
                        console.log(`⏳ Waiting for categoriesCarousel...`);
                        setTimeout(check, 250);
                    }
                };
                check();
            });
        },
        initCategoriesCarousel() {
            if (process.client) {
                this.$nextTick(() => {
                    try {
                        const carouselElement = this.$refs.categoriesCarousel;
                        if (carouselElement && $(carouselElement).length) {
                                // 如果已經初始化，先銷毀
                                if ($(carouselElement).hasClass('slick-initialized')) {
                                    $(carouselElement).slick('unslick');
                                }
                            
                                // 創建新的選項對象，避免修改原始對象
                                const options = this.carouseOptions;

                                // 重新初始化
                                $(carouselElement).slick(options);
                                console.log('Categories carousel initialized');
                        }
                    } catch (e) {
                        console.error('Categories carousel initialization error:', e);
                    }
                });
            }
        },
        debounceInitCategoriesCarousel: debounce(function() {
            this.initCategoriesCarousel();
        }, 500),
        waitForBrandCarouselCarouselReady() {
            return new Promise((resolve) => {
                const check = () => {
                    if (this.$refs.brandCarousel && typeof $(this.$refs.brandCarousel).slick === 'function') {
                        console.log(`✅ brandCarousel is ready`);
                        resolve();
                    } else {
                        console.log(`⏳ Waiting for brandCarousel...`);
                        setTimeout(check, 250);
                    }
                };
                check();
            });
        },
        initBrandCarouselCarousel() {
            if (process.client) {
                this.$nextTick(() => {
                    try {
                        const brandElement = this.$refs.brandCarousel;
                        if (brandElement && $(brandElement).length) {
                                // 如果已經初始化，先銷毀
                                if ($(brandElement).hasClass('slick-initialized')) {
                                    $(brandElement).slick('unslick');
                                }
                            
                                // 創建新的選項對象，避免修改原始對象
                                const options = this.brandOptions;

                                // 重新初始化
                                $(brandElement).slick(options);
                                console.log('brand carousel initialized');
                        }
                    } catch (e) {
                        console.error('brand carousel initialization error:', e);
                    }
                });
            }
        },
        debounceInitBrandCarouselCarousel: debounce(function() {
            this.initBrandCarouselCarousel();
        }, 500)
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
        popularCategories() {
            return this.categories.filter(item => item.type !== 'all');
        },
        sliders() {
            return this.$store.getters['home/slider/sliders'];
        },
        slidersReady() {
            const container = this.$refs.sliderContainer;
            return container && container.children.length > 0 && container.offsetHeight > 0;
        },
        categoryMap() {
            return this.$store.getters['product/products/categoryMap'];
        },
        featuredProducts() {
            return this.$store.getters['product/products/featuredProducts'];
        },
        popularProducts() {
            return this.$store.getters['product/products/popularProducts'];
        },
        newAddedProducts() {
            return this.$store.getters['product/products/newAddedProducts'];
        },
    },
    watch: {
        '$i18n.locale': function() {
            // 語言變化時重新初始化 slider
            this.$nextTick(() => {
                this.debounceInitSlider();
                this.debounceInitCategoriesCarousel();
                this.debounceInitBrandCarouselCarousel();
            });
        }
    },
    mounted() {
        this.waitForSlickReady().then(() => {
            this.initSlider();
        });
        this.waitForCategoriesCarouselReady().then(() => {
            this.initCategoriesCarousel();
        });
        this.waitForBrandCarouselCarouselReady().then(() => {
            this.initBrandCarouselCarousel();
        });
    }
}
</script>

<template>
    <main class="main">
        <section class="home-slider bg-grey-9 position-relative">
            <div class="hero-slider-1 dot-style-1 dot-style-1-position-1" ref="sliderContainer">
                <div class="single-hero-slider single-animation-wrap" v-for="slider in sliders" :key="slider.id">
                    <div class="container">
                        <div class="row align-items-center slider-animated-1">
                            <div class="col-lg-5 col-md-6">
                                <div class="hero-slider-content-2">
                                    <h4 class="animated">{{ slider.text_h4 }}</h4>
                                    <h2 class="animated fw-900">{{ slider.text_h2 }}</h2>
                                    <h1 class="animated fw-900 text-brand">{{ slider.text_h1 }}</h1>
                                    <p class="animated">{{ slider.text_p }}</p>
                                    <nuxt-link :to="slider.url" class="animated btn btn-default btn-rounded">
                                        {{ slider.text_url }} <i class="fa fa-arrow-right"></i> 
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-6">
                                <div class="single-slider-img single-slider-img-1">
                                    <img class="animated" :src="slider.img" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-arrow hero-slider-1-arrow"></div>
        </section>
        <section class="featured section-padding-60">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 mb-md-3 mb-lg-0">
                        <div class="banner-left-icon d-flex align-items-center wow fadeIn animated">
                            <div class="banner-icon">
                                <img src="/imgs/theme/icons/icon-truck.svg" alt="" />
                            </div>
                            <div class="banner-text">
                                <h3 class="icon-box-title">{{ $t('free_shipping') }}</h3>
                                <p>{{ $t('free_shippiing_condition') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-md-3">
                        <div class="banner-left-icon d-flex align-items-center wow fadeIn animated">
                            <div class="banner-icon">
                                <img src="/imgs/theme/icons/icon-purchase.svg" alt="" />
                            </div>
                            <div class="banner-text">
                                <h3 class="icon-box-title">{{ $t('free_returns') }}</h3>
                                <p>{{ $t('free_returns_condition') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="banner-left-icon d-flex align-items-center wow fadeIn animated">
                            <div class="banner-icon">
                                <img src="/imgs/theme/icons/icon-bag.svg" alt="" />
                            </div>
                            <div class="banner-text">
                                <h3 class="icon-box-title">{{ $t('member_gift') }}</h3>
                                <p>{{ $t('cost_points') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="banner-left-icon d-flex align-items-center wow fadeIn animated mb-sm-0">
                            <div class="banner-icon">
                                <img src="/imgs/theme/icons/icon-operator.svg" alt="" />
                            </div>
                            <div class="banner-text">
                                <h3 class="icon-box-title">{{ $t('support_center') }}</h3>
                                <p>{{ $t('service_time') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="popular-categories bg-grey-9 section-padding-60">
            <div class="container wow fadeIn animated">
                <h3 class="section-title mb-30">
                    <span>{{ $t('popular_categories') }}</span> 
                    {{ $t('categories') }}
                </h3>
                <div class="carausel-6-columns-cover position-relative">
                    <div class="slider-arrow categories-carausel-arrow carausel-6-columns-arrow" id="carausel-6-columns-arrows" ref="categoryArrows">
                        
                    </div>
                    <div class="carausel-6-columns" id="carausel-6-columns" ref="categoriesCarousel">
                        <div 
                            class="card-1 border-radius-10 hover-up p-30"
                            v-for="category in popularCategories" 
                            :key="category.type"
                        >
                            <figure class="mb-30 img-hover-scale overflow-hidden">
                                <img :src="category.img" alt="" />
                            </figure>
                            <h5>
                                <nuxt-link :to="`/${currentLang.code}/shop/${category.type}`">
                                    {{ category.name }}
                                </nuxt-link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="product-tabs pt-40 pb-30 wow fadeIn animated">
            <div class="container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="nav-featured" data-bs-toggle="tab" data-bs-target="#featured" type="button" role="tab" aria-controls="featured" aria-selected="true">
                            {{ $t('products_tab.featured') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="nav-popular" data-bs-toggle="tab" data-bs-target="#popular" type="button" role="tab" aria-controls="popular" aria-selected="false">
                            {{ $t('products_tab.popular') }}
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="nav-new_added" data-bs-toggle="tab" data-bs-target="#new_added" type="button" role="tab" aria-controls="new_added" aria-selected="false">
                            {{ $t('products_tab.new_added') }}
                        </button>
                    </li>
                </ul>
                <!--End nav-tabs-->
                <div class="tab-content wow fadeIn animated" id="myTabContent">
                    <div class="tab-pane fade show active" id="featured" role="tabpanel" aria-labelledby="featured">
                        <div class="row product-grid-4">
                            <div class="col-lg-3 col-md-4 col-12 col-sm-6" v-for="item in featuredProducts" :key="item.id">
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
                                            <span class="best">{{ item.badge }}</span>
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
                        <!--End product-grid-4-->
                    </div>
                    <!--En tab one (Featured)-->
                    <div class="tab-pane fade" id="popular" role="tabpanel" aria-labelledby="popular">
                        <div class="row product-grid-4">
                            <div class="col-lg-3 col-md-4 col-12 col-sm-6" v-for="item in popularProducts" :key="item.id">
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
                        <!--End product-grid-4-->
                    </div>
                    <!--En tab two (Popular)-->
                    <div class="tab-pane fade" id="new_added" role="tabpanel" aria-labelledby="new_added">
                        <div class="row product-grid-4">
                            <div class="col-lg-3 col-md-4 col-12 col-sm-6" v-for="item in newAddedProducts" :key="item.id">
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
                                            <span class="new">{{ item.badge }}</span>
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
                        <!--End product-grid-4-->
                    </div>
                    <!--En tab three (New added)-->
                </div>
                <!--End tab-content-->
            </div>
        </section>
        <section class="section-padding-60">
            <div class="container">
                <h3 class="section-title style-1 mb-30 wow fadeIn animated">{{ $t('featured_brands') }}</h3>
                <div class="carausel-6-columns-cover arrow-center position-relative wow fadeIn animated">
                    <div class="slider-arrow categories-brand-arrow carausel-6-columns-arrow" id="carausel-6-columns-3-arrows"></div>
                    <div class="carausel-6-columns text-center" id="carausel-6-columns-3" ref="brandCarousel">
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-1.png" alt="" />
                        </div>
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-2.png" alt="" />
                        </div>
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-3.png" alt="" />
                        </div>
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-4.png" alt="" />
                        </div>
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-5.png" alt="" />
                        </div>
                        <div class="brand-logo">
                            <img class="img-grey-hover" src="/imgs/banner/brand-6.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>

</style>
