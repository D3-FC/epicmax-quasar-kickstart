import { DataObject } from '../DataObject'

export class AppError extends Error{
  message: string = 'Woops! Something went wrong. :('

  constructor (data: DataObject = {}) {
    super()
  }
}
