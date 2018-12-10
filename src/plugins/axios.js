import axios from 'axios'
import { config } from '../config'
import { stringify } from '../utilities/Helper/StringHelpers'
// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: (params) => {
    return stringify(params)
  }
})

export default ({ Vue, router }) => {
  Vue.prototype.$axios = axiosInstance

  axiosInstance.interceptors.response.use(
    response => {
      // minimum version 1.0.0
      // newest version 2.0.0
      // test trigger on /users/me
      // Check if forece update is required
      /* if(response.data.data.id == '8qn5r4j294') {
                console.log("Lets redirect now");
                //router.replace('/force-update');
            } */

      return response
    },
    err => {
      return Promise.reject(err)
    }
  )
}

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance }
