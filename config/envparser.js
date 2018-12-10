const BUILD_ENV = process.env.BUILD_ENV
const env = require(`../environments/${BUILD_ENV}.json`)
const constantCase = require('constant-case')

module.exports = function (appPackage) {
  let packageConfig = {}
  Object.keys(appPackage.config).forEach(key => {
    packageConfig[constantCase(key)] = appPackage.config[key]
  })

  let result = {
    ...env,
    ...packageConfig
  }

  console.log('Build environment: ' + BUILD_ENV)
  console.log(JSON.stringify({ env: result }, null, ' '))

  const parsedResult = {}

  Object.keys(result).forEach(key => {
    parsedResult[key] = JSON.stringify(result[key])
  })

  return parsedResult
}
