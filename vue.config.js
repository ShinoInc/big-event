const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './'
})
const path = require('path')
module.exports = {
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/icons')

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-svg-[name]',
        extract: false
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .tap((options) => ({
        ...options,
        plugins: [{ name: 'removeAttrs', params: { attrs: 'fill' } }]
      }))
      .end()

    config
      .plugin('svg-sprite')
      .use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])

    config.module.rule('svg').exclude.add(dir)
  }
}
