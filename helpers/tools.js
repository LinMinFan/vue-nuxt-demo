// helpers/tools.js
export const switchLanguage = (code, { $i18n, $store }) => {
    $i18n.setLocale(code);
    $store.dispatch('head/head-top/SET_CURRRENT_LANG_CODE', code);
}

export const onSearch = (searchCategory, searchKeyword) => {
    console.log('搜尋觸發:', searchCategory, searchKeyword);
}
