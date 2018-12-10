import { MiddlewareError } from './MiddlewareError'
import { DataObject } from '../DataObject'
import { CanHandleContract } from './CanHandleContract'
import Vue from 'vue'

export class MiddlewareHandler {
  nextList: Function[] = []
  payload: DataObject
  middleware: CanHandleContract[] = []
  chain: Promise<any>

  constructor (middleware: CanHandleContract, to: Function, Vue: Vue, next: Function, payload: DataObject) {
    this.chain = Promise.resolve()
    this.payload = {
      to, Vue, next, ...payload
    }
    this.setMiddleware(middleware)
  }

  async handleMiddleware (middleware: CanHandleContract) {
    try {
      const next = await middleware.handle(this.payload)
      if (next && next instanceof Function) {
        this.nextList.push(next)
      }
    } catch (e) {
      if ((e instanceof MiddlewareError) && e.next) {
        e.next()
      }

      throw e
    }
  }

  setMiddleware (middleware: DataObject) {
    if (Array.isArray(middleware)) {
      this.middleware = middleware
      return true
    }

    if (typeof middleware === 'object') {
      this.middleware = [
        <CanHandleContract>middleware
      ]
      return true
    }

    return false
  }

  handleNextList () {
    if (this.nextList && this.nextList.length > 0) {
      this.nextList[this.nextList.length - 1]()
      return
    }
    this.payload.next()
  }

  prepareActions () {


    this.middleware.forEach(async (middleware) => {
      this.chain = this.chain.then(async () => {
        await this.handleMiddleware(middleware)
      })
    })
  }

  async handle () {
    this.prepareActions()
    await this.chain
    this.handleNextList()

    if (this.isEmptyMiddleware) {
      this.payload.next()
    }
  }

  get isEmptyMiddleware () {
    return Array.isArray(this.middleware) && !this.middleware.length
  }
}
