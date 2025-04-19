export default () => {
    if (process.client) {
      const scripts = [
        '/js/vendor/modernizr-3.6.0.min.js',
        '/js/vendor/jquery-migrate-3.3.0.min.js',
        '/js/vendor/bootstrap.bundle.min.js'
      ]
  
      scripts.forEach(src => {
        const script = document.createElement('script')
        script.src = src
        script.defer = true
        document.body.appendChild(script)
      })
    }
  }
  