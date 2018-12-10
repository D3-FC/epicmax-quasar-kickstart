export class ValidationError {
  key: string  = ''
  value: string|string[] = ''

  constructor (data = {}) {
    Object.assign(this, data)
  }
}
