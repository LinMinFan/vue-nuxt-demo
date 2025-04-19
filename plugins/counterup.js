export default () => {
    if (process.client) {
      const script = document.createElement('script')
      script.src = '/js/plugins/counterup.js'
      script.defer = true
      document.body.appendChild(script)
    }
  }
  