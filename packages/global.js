const packageJson = require(`../package.json`)

module.exports = {
  build: {
    css: [
      'app.styl',
      'app.scss'
    ],
    loaders: {
      sass: `
        @import 'src/css/base/resources.scss';
      `
    }
  },
  config: {
    id: packageJson.cordovaId,
    version: packageJson.version,
    brandPrimary: '#7BC757'
  }
}
