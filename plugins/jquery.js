export default (context, inject) => {
  if (process.client) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = '/js/vendor/jquery-3.7.1.min.js'
      script.onload = () => {
        // 將 jQuery 掛到全域
        window.$ = window.jQuery = window.jQuery || window.$
        resolve()
      }
      document.head.appendChild(script)
    })
  }
}
  