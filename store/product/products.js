// store/product/products.js
import { productApi } from '@/api/index.js';

export default {
    namespaced: true,
    state: () => ({
        products: [],
        categoryMap: {
            1: "女性服飾",
            2: "男性服飾",
            3: "行動裝置",
            4: "電腦週邊",
            5: "生活家電",
        },
    }),
    actions: {
        // 初始化數據
        async init({ commit }) {
            try {
                const [products] = await Promise.all([
                    productApi.getProducts(),
                ]);

                commit('SET_PRODUCTS', products.data);
            } catch (error) {
                console.error('Failed to initialize data:', error);
            }
        },

        // 單獨加載數據（可根據需要調用）
        async fetchProducts({ commit }) {
            try {
                const response = await productApi.getProducts();
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        },
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
    },
    getters: {
        allProducts(state) {
            return state.products;
        },
        featuredProducts(state) {
            return state.products.filter((product) => { 
                return product.tab === 'featured' 
            });
        },
        popularProducts(state) {
            return state.products.filter((product) => { 
                return product.tab === 'popular'
            });
        },
        newAddedProducts(state) {
            return state.products.filter((product) => { 
                return product.tab === 'new_added'
            });
        },
        categoryMap(state) {
            return state.categoryMap;
        },
    },
};