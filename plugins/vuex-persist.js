// plugins/vuex-persist.js

import VuexPersist from 'vuex-persist'

export default ({ store }) => {
  // 初始化 vuex-persist 並使用 sessionStorage
  new VuexPersist({
    storage: window.sessionStorage, // 設定為 sessionStorage
    reducer: state => ({
      head: {
        'head-top': {
          currentLangCode: state.head['head-top'].currentLangCode,
        },
      },
    }),
  }).plugin(store)
}
