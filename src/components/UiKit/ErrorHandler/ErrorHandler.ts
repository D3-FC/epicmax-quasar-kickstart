import { AppError } from '../../../utilities/Error/AppError'

export type CommandThrowable = (...args: any) => any

export interface Notifiable {
  notifyError (message?: string): void
}

export class ErrorHandler {

  notifyError: Function

  constructor (notifyError: Function) {
    this.notifyError = notifyError
  }

  async handle (command: CommandThrowable) {
    try {
      return await command()
    } catch (e) {
      if (e instanceof AppError) {
        this.notifyError(e.message)
      }
    }
  }
}
