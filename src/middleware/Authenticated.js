import { MiddlewareError } from '../utilities/Middleware/MiddlewareError'

export class Authenticated {
  async handle ({ to, next, Vue }) {
    /** @var {Auth} */
    const auth = Vue.prototype.$auth
    if (!auth.wasRun) {
      Vue.prototype.$epicmax.isPending = true
    }

    const redirect = (e = undefined) => {
      Vue.prototype.$epicmax.isPending = false
      throw new MiddlewareError({
        message: 'didnt pass Authenticated middleware',
        next: () => next({
          name: 'login',
          replace: true,
          previous: e
        })
      })
    }
    let isAuthorized

    try {
      isAuthorized = await auth.checkIsAuthorized()
    } catch (e) {
      redirect(e)
    }

    if (isAuthorized) {
      Vue.prototype.$epicmax.isPending = false
      return () => next()
    } else {
      redirect()
    }
  }
}
