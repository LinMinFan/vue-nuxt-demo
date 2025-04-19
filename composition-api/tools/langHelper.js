const LANG_KEY = 'lang'

const saveLangToStorage = (lang) => {
  if (process.client) {
    sessionStorage.setItem(LANG_KEY, JSON.stringify(lang))
  }
}

const getLangFromStorage = () => {
  if (process.client) {
    const lang = sessionStorage.getItem(LANG_KEY)
    try {
      return lang ? JSON.parse(lang) : null
    } catch (e) {
      return null
    }
  }
  return null
}

const removeLangFromStorage = () => {
  if (process.client) {
    sessionStorage.removeItem(LANG_KEY)
  }
}

export default {
    saveLangToStorage,
    getLangFromStorage,
    removeLangFromStorage,
}
