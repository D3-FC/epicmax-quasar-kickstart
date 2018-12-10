import { ExtendedDate } from './ExtendedDate'

export class ExtendedDateTransformer {
  /**
   *
   * @param data {Object}
   * @return {ExtendedDate}
   */
  toClass (data) {
    return new ExtendedDate({
      date: data.date ? new Date(data.date) : null,
      timezoneType: data.timezone_type,
      timezone: data.timezone
    })
  }

  /**
   *
   * @param extendedDate {ExtendedDate}
   * @return {ExtendedDate}
   */
  toObject (extendedDate) {
    return {
      date: extendedDate.date ? extendedDate.date.toDateString() : null,
      timezone_type: extendedDate.timezoneType,
      timezone: extendedDate.timezone
    }
  }
}
