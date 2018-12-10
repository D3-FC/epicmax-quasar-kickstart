import Vue from 'vue'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import { AxiosInstance } from 'axios'
import VueRouter from 'vue-router'
import { DataObject } from './utilities/DataObject'
import { Bus } from './utilities/Bus/Bus'

declare module 'vue/types/vue' {


  interface Vue {
    $axios: AxiosInstance
    $router: VueRouter
    $epicmax: DataObject
    $eventBust: Bus
  }
}
