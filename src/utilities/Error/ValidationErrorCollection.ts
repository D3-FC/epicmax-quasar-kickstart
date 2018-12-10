import { ValidationError } from './ValidationError'
import { toCamelCase } from '../Helper/StringHelpers'
import { DataObject } from '../DataObject'

export default class ValidationErrorCollection {
  errors: ValidationError[] = []

  constructor (data = {}) {
    Object.assign(this, data)
  }

  getFor (field: string): string|string[]|null {
    const validationError = this.errors.find(
      error => error.key === field || error.key === `${field}_id`)
    return validationError ? validationError.value : null
  }

  clearFor (field = '') {
    const validationError = this.errors.find(
      error => error.key === field || error.key === `${field}_id`)
    if (validationError) {
      validationError.value = []
    }
  }

  clear () {
    this.errors = []
  }

  static createFromLaravelErrors (laravelErrors: DataObject) {
    let errors = Object.keys(laravelErrors.errors).map(key => {
      const value = laravelErrors.errors[key]
      return new ValidationError({ key: toCamelCase(key), value })
    })
    return new ValidationErrorCollection({ errors })
  }

  addError (key: string, value: string) {
    this.errors.push(new ValidationError({ key, value }))
  }

  clearCollection () {
    this.errors = []
  }

  get hasError () {
    return !!this.errors.length
  }
}
