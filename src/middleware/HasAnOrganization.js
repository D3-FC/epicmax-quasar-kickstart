import { MiddlewareError } from '../utilities/Middleware/MiddlewareError'

/**
 * NOTE: use this middleware only after Authenticated middleware
 */
export class HasAnOrganization {
  async handle ({ to, next, Vue }) {
    /** @var {Auth} */
    const auth = Vue.prototype.$auth
    const redirect = () => {
      throw new MiddlewareError({
        message: 'didnt pass HasAnOrganization middleware',
        next: () => next({
          name: 'signup.team',
          replace: true
        })
      })
    }

    let hasAnOrganization

    try {
      hasAnOrganization = auth.currentUser && auth.currentUser.hasOrganization
    } catch (e) {
      redirect()
    }

    if (hasAnOrganization) {
      return () => next()
    } else {
      redirect()
    }
  }
}
