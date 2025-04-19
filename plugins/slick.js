export default () => {
    if (process.client) {
      const script = document.createElement('script')
      script.src = '/js/plugins/slick.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }
  