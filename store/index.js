// store/index.js
export const state = () => ({
    // 全局狀態
})

export const mutations = {
    // 全局狀態變更
}

export const actions = {
    async nuxtServerInit({ dispatch }) {
        try {
            // 做初始化
            await dispatch('head/head-top/init');
            await dispatch('head/head-middle/init');
            await dispatch('cart/cart/init');
            await dispatch('home/slider/init');
        } catch (e) {
            console.error('nuxtServerInit error:', e);
        }
    }   
}