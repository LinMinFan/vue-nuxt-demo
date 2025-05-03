// store/member/wishlist.js
import { wishlistApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        wishlist: [],
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [wishlist] = await Promise.all([
                    wishlistApi.getWishlist(),
                ]);

                commit('SET_Wishlist', wishlist.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        },

        // 單獨加載數據（可根據需要調用）
        async fetchWishlist({ commit }) {
            try {
                const response = await wishlistApi.getWishlist();
                commit('SET_Wishlist', response.data);
            } catch (error) {
                console.error('Failed to fetch wishlist:', error);
            }
        },
        updatedWishlist({ commit }, wishlist) {
            commit('SET_Wishlist', wishlist);
        }
    },
    mutations: {
        SET_Wishlist(state, wishlist) {
            state.wishlist = wishlist;
        },
    },
    getters: {
        wishlist(state) {
            return state.wishlist;
        },
    },
};