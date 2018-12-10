import { config } from '../config'

// NOTE: should be connected after axios plugin

export default ({ app, Vue }) => {
//  if (config.appBrandPrimary) {
//    colors.setBrand('positive', config.appBrandPrimary)
//  }
  const busPlugin = {
    install (Vue, options) {
      Vue.prototype.$epicmax = {
        isPending: false,
        config,
        log (...args) {
          console.log(...args)
        }
      }
    }
  }
  Vue.use(busPlugin)
}
