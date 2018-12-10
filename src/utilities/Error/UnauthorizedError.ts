import { AppError } from './AppError'
import { DataObject } from '../DataObject'

export class UnauthorizedError extends AppError {
  error:any
  message:any
  previous:any
  data:any

  constructor (data: DataObject = {}) {
    super(data)
    Object.assign(this, data)
  }
}
