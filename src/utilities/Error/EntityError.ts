// @ts-ignore
import ValidationErrorCollection from './ValidationErrorCollection'
// @ts-ignore
import { AppError } from './AppError'

export class EntityError extends AppError {
  message!:string

  code?:string

  errors: ValidationErrorCollection = new ValidationErrorCollection({})

  previous?: Error

  constructor (data = {}) {
    super()
    Object.assign(this, data)
  }


  static createFromAxiosError (exception: any): EntityError {
    const response = exception && exception.response
    const data = response && response.data
    if (EntityError.isEntityError(exception)) {
      return new EntityError({
        message: data.message,
        code: data.code,
        errors: ValidationErrorCollection.createFromLaravelErrors(data),
        previous: exception
      })
    }
    throw exception
  }

  static isEntityError (exception: any) {
    const status = exception && exception.response && exception.response.status
    return status === 422
  }

  /**
   * Covert exception instance to string.
   *
   * @returns {String}
   */
  toString () {
    return this.message
  }

  clear () {
    this.message = ''
    this.code = undefined
    this.errors.clearCollection()
  }

  addError (key: string, value: string) {
    this.errors.addError(key, value)
  }


  get hasErrors (): boolean {
    return !!this.errors.hasError
  }

  getError (field: string): string|string[]|null {
    return this.errors.getFor(field)
  }
}
