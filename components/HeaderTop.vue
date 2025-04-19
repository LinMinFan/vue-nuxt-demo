<script>
import { languagesApi, latestEventsApi, discountPlanApi, announcementApi } from '@/api/index.js'

export default {
    name: 'HeaderTop',
    data() {
        return {
            languages: [],
            latestEvents: [],
            discountPlan: [],
            announcement: [],
            islogin: false,
        }
    },
    computed: {
        currentLang() {
            return this.$store.getters['config/currentLang']
        },
        currentList() {
            return this.languages.filter(lang => lang.code !== this.currentLang.code)
        }
    },
    async mounted() {
        this.fetchLanguages()
        this.fetchLatestEvents()
        this.fetchDiscountPlan()
        this.fetchAnnouncement()
    },
    methods: {
        changeLanguage(code) {
            const currentLangMap = this.$store.getters['config/languageMap']

            if (!currentLangMap[code]) return
            if (this.currentLang.code === code) return

            const lang = {
                code,
                title: currentLangMap[code].title
            }
            this.$store.dispatch('config/SET_LANG', lang).then(() => {
                // 語言變更後，重新載入頁面以觸發 head 更新
                window.location.reload()
            })
        },
        async fetchLanguages() {
            try {
              const res = await languagesApi.getLanguages()
              this.languages = res.data
            } catch (err) {
              console.error('載入語言失敗', err)
            }
        },
        async fetchLatestEvents() {
            try {
              const res = await latestEventsApi.getLatestEvents()
              this.latestEvents = res.data
            } catch (err) {
              console.error('載入最新活動失敗', err)
            }
        },
        async fetchDiscountPlan() {
            try {
              const res = await discountPlanApi.getdDscountPlan()
              this.discountPlan = res.data
            } catch (err) {
              console.error('載入優惠方案失敗', err)
            }
        },
        async fetchAnnouncement() {
            try {
              const res = await announcementApi.getAnnouncement()
              this.announcement = res.data
            } catch (err) {
              console.error('載入公告訊息失敗', err)
            }
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
                                <a class="language-dropdown-active" href="#"> <i class="fa fa-globe-americas"></i> {{ currentLang.title }} <i class="fa fa-chevron-down"></i></a>
                                <ul class="language-dropdown" v-if="currentList.length !== 0">
                                    <li v-for="lang in currentList" :key="lang.code">
                                        <a href="#" @click.prevent="changeLanguage(lang.code)">{{ lang.title }}</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a v-if="islogin" href="page-login-register.html">登出</a>
                                <a v-else href="page-login-register.html">登入</a>
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