<script>
import { switchLanguage } from '@/helpers/tools'

export default {
    name: 'HeaderTop',
    props: {
        islogin: {
            type: Boolean,
            default: false
        },
        logout: {
            type: Function,
        },
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
        languages() {
            const lang = this.$store.getters['head/head-top/languages']
            return lang.filter(l => l.code !== this.currentLang.code)
        },
        latestEvents() {
            return this.$store.getters['head/head-top/latestEvents']
        },
        discountPlan() {
            return this.$store.getters['head/head-top/discountPlan']
        },
        announcement() {
            return this.$store.getters['head/head-top/announcement']
        },
    },
    methods: {
        switchLang(code) {
            switchLanguage(code, { $i18n: this.$i18n, $store: this.$store });
        },
        waitForTickerReady() {
            return new Promise((resolve) => {
                const check = () => {
                    if (this.$refs.vTicker && typeof $(this.$refs.vTicker).vTicker === 'function') {
                        console.log(`✅ vTicker is ready`);
                        resolve();
                    } else {
                        console.log(`⏳ Waiting for vTicker...`);
                        setTimeout(check, 250);
                    }
                };
                check();
            });
        },
        async initTicker() {
            if (process.client) {
                this.$nextTick(() => {
                    try {
                        const vTickerElement = $(this.$refs.vTicker);
                        if (vTickerElement) {
                            vTickerElement.vTicker( {
                                speed: 500,
                                pause: 3000,
                                animation: 'fade',
                                mousePause: false,
                                showItems: 1
                            });
                        }
                    } catch (e) {
                        console.error('vTicker initialization error:', e);
                    }
                });
            }
        },
    },
    mounted() {
        this.waitForTickerReady().then(() => {
            this.initTicker();
        });
    },
    watch: {
        currentLang() {
            this.waitForTickerReady().then(() => {
                this.initTicker();
            });
        },
    },
}
</script>

<template>
    <div class="header-top header-top-ptb-1 d-none d-lg-block">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xl-3 col-lg-4">
                    <div class="header-info">
                        {{ $t('welcome') }}
                    </div>
                </div>
                <div class="col-xl-6 col-lg-4">
                    <div class="text-center">
                        <div id="news-flash" class="d-inline-block" ref="vTicker">
                            <ul>
                                <!-- 最新活動 -->
                                <li v-for="le in latestEvents" :key="le.url">
                                    <i class="fa fa-angle-double-right mr-5"></i> {{ le.title }}
                                    <a class="active" :href="le.url">活動詳情</a>
                                </li>
                                <!-- 優惠方案 -->
                                <li v-for="dp in discountPlan" :key="dp.title">
                                    <i class="fa fa-asterisk mr-5"></i>
                                    <b class="text-danger">{{ dp.title }}</b> - {{ dp.content }}
                                </li>
                                <!-- 公告訊息 -->
                                <li v-for="am in announcement" :key="am.url">
                                    <i class="fa fa-bell mr-5"></i>
                                    <b class="text-success"> {{ am.title }}</b> {{ am.content }} 
                                    <a :href="am.url">查看訊息</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4">
                    <div class="header-info header-info-right">
                        <ul>
                            <li>
                                <a class="language-dropdown-active" href="#"> 
                                    <i class="fa fa-globe-americas"></i> 
                                    {{ currentLang.name }}
                                    <i class="fa fa-chevron-down"></i>
                                </a>
                                <ul class="language-dropdown">
                                    <li v-for="lang in languages" :key="lang.code">
                                        <a href="#" @click.prevent="switchLang(lang.code)" >
                                            {{ lang.name }}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a v-if="islogin" href="#" @click.prevent="logout()" >登出</a>
                                <nuxt-link v-else :to="`/${currentLang.code}/auth/login`">
                                    登入
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>