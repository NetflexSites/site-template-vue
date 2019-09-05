const { resolve } = require('path')

module.exports = {
  outputDir: resolve(__dirname, 'public/assets'),

  filenameHashing: false,

  runtimeCompiler: true,

  publicPath: process.env.NODE_ENV === 'development'
    ? 'http://0.0.0.0:8080'
    : '/assets/',

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    useLocalIp: true,
    port: 8080,
    disableHostCheck: true,
  },

  chainWebpack (config) {
    config
      .plugins.delete('html').end()
      .plugins.delete('preload').end()
      .plugins.delete('prefetch').end()
  }
}
