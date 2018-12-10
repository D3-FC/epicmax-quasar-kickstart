import { config } from '../config'

export default ({ app, router, Vue }) => {
// https://github.com/asvae/vue-book
// Demo routes
  if (config.isDev) {
    import('../components/Demo/demo.scss')

    Vue.prototype.$demo = {
      log (...args) {
        console.log(...args)
      }
    }

    const VueComponentTree = require('vue-book')
    router.addRoutes([
      {
        path: '/',
        component: () => import('../components/Demo/VDemoLayout'),
        children: [
          VueComponentTree.createRoute({
            requireContext: require.context('./../components', true, /(.*).demo.vue$/),
            path: '/demo',
            hideFileExtensions: false
          })
        ]
      }
    ])
  }
}
