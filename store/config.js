// store/config.js
import { useLangHelper } from '@/composition-api/index.js'

export const state = () => ({
    currentLang: {title: '繁體中文', code: 'zh-TW'},
    languageMap: {
      'zh-TW': {title: '繁體中文', code: 'zh-TW'},
      'zh-CN': {title: '簡體中文', code: 'zh-CN'},
      'en': {title: 'English', code: 'en'},
    }
  })
  
export const actions = {
  SET_LANG({ commit }, lang) {
    commit('SET_LANG', lang)
  },
  SET_LANG_MAP({ commit }, languageMap) {
    commit('SET_LANG_MAP', languageMap)
  },
  initLang({ commit }) {
    // 使用 vuex-persist 來持久化 vuex 的狀態
    /* const lang = useLangHelper.getLangFromStorage()
    if (lang) {
      commit('SET_LANG', lang)
    } */
  }
}

export const mutations = {
  SET_LANG(state, lang) {
    state.currentLang = lang
    // 使用 vuex-persist 來持久化 vuex 的狀態
    /* useLangHelper.saveLangToStorage(lang) */
  },
  SET_LANG_MAP(state, languageMap) {
    state.languageMap = languageMap
  }
}

export const getters = {
  currentLang(state) {
    return state.currentLang
  },
  languageMap(state) {
    return state.languageMap
  }
}
  