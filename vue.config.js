const { resolve } = require('path')
const { existsSync } = require('fs')

const outputDir = resolve(__dirname, 'public/assets')

const publicCopyDir = resolve(__dirname, 'src/public')

/*
 * Assumes port to be equal to default in @vue/cli-service.
 * No way to know, as it isn't exposed
 */
const port = process.env.PORT || 8080

module.exports = {
  outputDir,

  runtimeCompiler: true,

  publicPath: process.env.npm_lifecycle_event === 'serve'
    ? `http://localhost:${port}`
    : '/assets/',

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port,
    disableHostCheck: true,
  },

  chainWebpack (config) {
    config.plugin('assetsManifest').use(require('webpack-assets-manifest'), [{
      output: resolve(__dirname, 'config', 'webpackManifest.json'),
      publicPath: true,
      entrypoints: true,
      writeToDisk: true,
    }])

    config
      .plugins.delete('html').end()
      .plugins.delete('preload').end()
      .plugins.delete('prefetch').end()

    if (existsSync(publicCopyDir)) {
      if (!config.plugins.has('copy')) {
        config.plugin('copy').use(require('webpack-copy-plugin'), [[{}]])
      }

      config.plugin('copy').tap(([[options]]) => [[{
        ...options,
        from: publicCopyDir,
        to: outputDir,
        toType: 'dir',
      }]])
    } else {
      config.plugins.delete('copy')
    }
  },
}
