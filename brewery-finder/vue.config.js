const path = require('path')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: path.resolve(__dirname, '../services/blueprints/brewery/static/app'),

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
