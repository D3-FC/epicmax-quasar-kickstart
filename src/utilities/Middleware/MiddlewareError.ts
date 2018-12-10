interface MiddlewareErrorInterface {
  message: string,
  next: Function,
  previous?: Error
}

export class MiddlewareError extends Error implements MiddlewareErrorInterface {
  next: Function
  previous: Error | undefined

  constructor (data: MiddlewareErrorInterface) {
    super()
    this.next = data.next
    this.message = data.message
    this.previous = data.previous
  }
}
