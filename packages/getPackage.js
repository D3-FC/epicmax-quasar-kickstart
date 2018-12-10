const PACKAGE = process.env.PACKAGE
if (!PACKAGE) {
  console.error('you should specify PACKAGE env variable')
}
const appPackage = require(`../packages/${PACKAGE}.js`)
if (!appPackage) {
  console.error('you should create package.js config in /packages folder accordingly specified PACKAGE ')
}

module.exports = function () {
  return appPackage
}
