import { Component } from 'vue'
import { DataObject } from '../DataObject'

export class Bus {
  subscribers: Map<Component, DataObject>

  constructor () {
    // Subscribed components - array of closures
    this.subscribers = new Map()
  }

  on (event: string|string[], closure: Function, component: Component) {
    if (Array.isArray(event)) {
      event.forEach(event => this.on(event, closure, component))
      return
    }

    const componentSubscribes = this.subscribers.get(component) || this.subscribeNew(component)
    componentSubscribes[event] = closure
  }

  emit (event: string, ...args: any) {
    this.subscribers.forEach(subscribes => subscribes[event] && subscribes[event](...args))
  }

  wipeComponentSubscriptions (component: Component) {
    this.subscribers.delete(component)
  }

  subscribeNew (component: Component) {
    const componentSubscribes = {}
    this.subscribers.set(component, componentSubscribes)
    return componentSubscribes
  }
}
