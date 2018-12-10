import { AppError } from './AppError'

export class ApiError extends AppError {
  message!:string

  constructor (data = {}) {
    super()
    Object.assign(this, data)
  }
}
