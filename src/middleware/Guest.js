import { MiddlewareError } from '../utilities/Middleware/MiddlewareError'

export class Guest {
  next

  async handle ({ to, next, Vue }) {
    /** @var {Auth} */
    const auth = Vue.prototype.$auth
    if (!auth.wasRun) {
      Vue.prototype.$epicmax.isPending = true
    }

    let isAuthorized

    try {
      isAuthorized = await auth.checkIsAuthorized()
    } catch (e) {
      Vue.prototype.$epicmax.isPending = false
      throw new MiddlewareError({
        message: 'didnt pass Guest middleware',
        next: () => next(),
        previous: e
      })
    }

    if (!isAuthorized) {
      Vue.prototype.$epicmax.isPending = false
      return () => next()
    } else {
      Vue.prototype.$epicmax.isPending = false
      throw new MiddlewareError({
        message: 'didnt pass Guest middleware',
        next: () => next({
          name: 'home',
          replace: true
        })
      })
    }
  }
}
