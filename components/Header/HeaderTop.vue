<script>

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
        currentLang: {
            type: Object,
            default: () => ({})
        },
        languages: {
            type: Array,
            default: () => []
        },
        latestEvents: {
            type: Array,
            default: () => []
        },
        discountPlan: {
            type: Array,
            default: () => []
        },
        announcement: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
        }
    },
    computed: {
        
    },
    mounted() {

    },
    methods: {
        switchLanguage(code) {
            this.$i18n.setLocale(code)
            this.$store.dispatch('head/head-top/SET_CURRRENT_LANG_CODE', code)
        },
    },
    watch: {

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
                        <div id="news-flash" class="d-inline-block">
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
                                        <a href="#" @click.prevent="switchLanguage(lang.code)" >
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

<style>
    
</style>