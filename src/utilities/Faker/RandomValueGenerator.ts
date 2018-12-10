//@ts-ignore
import { ExtendedDate } from '../Date/ExtendedDate'
//@ts-ignore
import { dateFormat } from '../Helper/DateHelpers'

export class RandomValueGenerator {
  count = 1

  /**
   * Get random id
   */
  getUniqueId (): number {
    return ++this.count
  };

  /**
   * Get random number in specified range.
   */
  getNumber (min = 5, max = 50): number {
    max = max + 1
    return Math.floor(Math.random() * (max - min)) + min
  }

  /**
   * Get random number in specified range.
   */
  getBoolean (): boolean {
    return Math.random() >= 0.5
  }

  /**
   * Get random string in specified range.
   */
  getString (size = 5, possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
    let text = ''
    this.getArrayByClosure(() => {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }, size)
    return text
  }

  getText (size: number): string {
    return this.getString(size, ' abcdefg hijklmn opqrst uvwxyz ')
  }

  getEmail (): string {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    return `${this.getString(5, lowerCase)}@${this.getString(5, lowerCase)}.${this.getString(3,
      lowerCase)}`
  }

  getArrayByClosure (closure: Function, size: number = 3) {
    return this.getCleanArray(size).map(closure)
  }

  getCleanArray (length:number = 0) {
    return Array.apply(null, Array(length))
  }

  getDateFromPast (): ExtendedDate {
    return new ExtendedDate({
      date: new Date(
        this.getNumber(0, +new Date())
      )
    })
  }

  getDateFromFuture (): ExtendedDate {
    return new ExtendedDate({
      date: new Date(
        this.getNumber(+new Date(), (+new Date()) * 2)
      )
    })
  }

  getRandomTime (mask: string = 'HH:mm:ss'): string {
    return dateFormat(
      new Date(this.getNumber(0, +new Date() * 1000)),
      mask
    )
  }

  getUrl (width: number = 320, height: number = 240): string {
    return `https://loremflickr.com/${320}/${height}`
  }
}
