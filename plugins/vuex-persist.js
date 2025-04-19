// plugins/vuex-persist.client.js

import VuexPersist from 'vuex-persist'

export default ({ store }) => {
  // 初始化 vuex-persist 並使用 sessionStorage
  new VuexPersist({
    storage: window.sessionStorage, // 設定為 sessionStorage
  }).plugin(store)
}
