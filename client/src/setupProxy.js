const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/submit_user', {
      target: 'http://localhost:4000/',
      changeOrigin: true
    })
  )
}