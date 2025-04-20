// store/head/head-top.js
import { languagesApi, latestEventsApi, discountPlanApi, announcementApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        currentLangCode: 'zh-TW',
        languages: [],
        latestEvents: [],
        discountPlan: [],
        announcement: [],
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [languages, latestEvents, discountPlan, announcement] = await Promise.all([
                    languagesApi.getLanguages(),
                    latestEventsApi.getLatestEvents(),
                    discountPlanApi.getDiscountPlan(),
                    announcementApi.getAnnouncement(),
                ]);
                const defaultLangCode = this.$i18n.locale;

                commit('SET_CURRRENT_LANG_CODE', defaultLangCode);
                commit('SET_LANGUAGES', languages.data);
                commit('SET_LATEST_EVENTS', latestEvents.data);
                commit('SET_DISCOUNT_PLAN', discountPlan.data);
                commit('SET_ANNOUNCEMENT', announcement.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
                // 可以進行錯誤處理，如通知用戶等
            }
        },
        SET_CURRRENT_LANG_CODE({ commit }, code) {
            commit('SET_CURRRENT_LANG_CODE', code);
        },
        // 單獨加載數據（可根據需要調用）
        async fetchLanguages({ commit }) {  
            try {
                const response = await languagesApi.getLanguages();
                commit('SET_LANGUAGES', response.data);
            } catch (error) {
                console.error('Failed to fetch languages:', error);
            }
        },
        async fetchLatestEvents({ commit }) {
            try {
                const response = await latestEventsApi.getLatestEvents();
                commit('SET_LATEST_EVENTS', response.data);
            } catch (error) {
                console.error('Failed to fetch latest events:', error);
            }
        },
        async fetchDiscountPlan({ commit }) {
            try {
                const response = await discountPlanApi.getDiscountPlan();
                commit('SET_DISCOUNT_PLAN', response.data);
            } catch (error) {
                console.error('Failed to fetch discount plan:', error);
            }
        },
        async fetchAnnouncement({ commit }) {
            try {
                const response = await announcementApi.getAnnouncement();
                commit('SET_ANNOUNCEMENT', response.data);
            } catch (error) {
                console.error('Failed to fetch announcement:', error);
            }
        },
    },
    mutations: {
        SET_CURRRENT_LANG_CODE(state, code) {
            state.currentLangCode = code;
        },
        SET_LANGUAGES(state, payload) {
            state.languages = payload;
        },
        SET_LATEST_EVENTS(state, payload) {
            state.latestEvents = payload;
        },
        SET_DISCOUNT_PLAN(state, payload) {
            state.discountPlan = payload;
        },
        SET_ANNOUNCEMENT(state, payload) {
            state.announcement = payload;
        },
    },
    getters: {
        currentLangCode(state) {
            return state.currentLangCode;
        },
        languages(state) {
            return state.languages;
        },
        latestEvents(state) {
            return state.latestEvents;
        },
        discountPlan(state) {
            return state.discountPlan;
        },
        announcement(state) {
            return state.announcement;
        },
    },
};