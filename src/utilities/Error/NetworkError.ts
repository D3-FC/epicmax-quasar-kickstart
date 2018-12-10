import { AppError } from './AppError'

export class NetworkError extends AppError {
  message!:string

  constructor (data = {}) {
    super()
    Object.assign(this, data)
  }
}
