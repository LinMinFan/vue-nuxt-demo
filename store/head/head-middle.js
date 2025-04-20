// store/head/head-top.js
import { categoriesApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        categories: [],
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [categories] = await Promise.all([
                    categoriesApi.getCategories(),
                ]);

                commit('SET_CATEGORIES', categories.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        },

        // 單獨加載數據（可根據需要調用）
        async fetchCategories({ commit }) {
            try {
                const response = await categoriesApi.getCategories();
                commit('SET_CATEGORIES', response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        },
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
    },
    getters: {
        categories(state) {
            return state.categories;
        },
    },
};