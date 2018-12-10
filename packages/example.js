const packageJson = require(`../package.json`)

module.exports = {
  build: {
    css: [
      'app.styl'
    ],
    loaders: {
      sass: `
        @import "your-scss-file"
      `
    }
  },
  config: {
    id: packageJson.cordovaId,
    version: packageJson.version,
    vueRouterMode: 'history',
    brandPrimary: '#7BC757'
  }
}
