// store/cart/cart.js
import { cartApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        cart: [],
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [cart] = await Promise.all([
                    cartApi.getCart(),
                ]);

                commit('SET_CART', cart.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        },

        // 單獨加載數據（可根據需要調用）
        async fetchCart({ commit }) {
            try {
                const response = await cartApi.getCart();
                commit('SET_CART', response.data);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        },
    },
    mutations: {
        SET_CART(state, cart) {
            state.cart = cart;
        },
    },
    getters: {
        cart(state) {
            return state.cart;
        },
    },
};