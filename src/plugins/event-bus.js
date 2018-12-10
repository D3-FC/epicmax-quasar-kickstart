import { Bus } from '../utilities/Bus/Bus'

export default ({ app, Vue }) => {
  const busPlugin = {
    install (Vue, options) {
      const bus = new Bus()

      Vue.mixin({
        beforeDestroy () {
          bus.wipeComponentSubscriptions(this)
        }
      })

      Vue.prototype.$busOn = function (event, closure) {
        bus.on(event, closure, this)
      }
      Vue.prototype.$busEmit = function (event, ...args) {
        bus.emit(event, ...args)
      }

      Vue.prototype.$eventBus = bus
    }
  }
  Vue.use(busPlugin)
}
