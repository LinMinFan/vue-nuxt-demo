export default () => {
    if (process.client) {
      const script = document.createElement('script')
      script.src = '/js/plugins/magnific-popup.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }
  