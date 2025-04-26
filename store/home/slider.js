// store/home/slider.js
import { sliderApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        sliders: [],
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [sliders] = await Promise.all([
                    sliderApi.getSlider(),
                ]);

                commit('SET_SLIDERS', sliders.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        },

        // 單獨加載數據（可根據需要調用）
        async fetchSliders({ commit }) {
            try {
                const response = await sliderApi.getSlider();
                commit('SET_SLIDERS', response.data);
            } catch (error) {
                console.error('Failed to fetch sliders:', error);
            }
        },
    },
    mutations: {
        SET_SLIDERS(state, sliders) {
            state.sliders = sliders;
        },
    },
    getters: {
        sliders(state) {
            return state.sliders;
        },
    },
};