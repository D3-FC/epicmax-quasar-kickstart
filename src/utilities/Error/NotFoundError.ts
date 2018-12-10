import { AppError } from './AppError'

export class NotFoundError extends AppError {
  message = 'not found'
  previous: any
  data: any

  constructor (data = {}) {
    super()
    Object.assign(this, data)
  }
}
