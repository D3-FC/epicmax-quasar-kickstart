import { dateFormat } from '../Helper/DateHelpers'

export class ExtendedDate {
  /**
   * @type {?Date}
   */
  date
  timezoneType
  timezone

  constructor (data = {}) {
    Object.assign(this, data)
  }

  toString () {
    return this.date && this.date.toLocaleString()
  }

  getDate () {
    return this.date.getDate()
  }

  clear () {
    this.date = undefined
    this.timezoneType = undefined
    this.timezone = undefined
  }

  /**
   *
   * @returns {String}
   */
  toFormat (mask = 'YYYY-MM-DD HH:mm:ss') {
    return dateFormat(this.date, mask)
  }
}
