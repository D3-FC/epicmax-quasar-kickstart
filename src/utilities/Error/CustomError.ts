import { AppError } from './AppError'
import { DataObject } from '../DataObject'

export class CustomError extends AppError {
  code!: string|number
  message!:string
  previous!: Error
  data!: DataObject

  constructor (data = {}) {
    super()
    Object.assign(this, data)
  }
}
