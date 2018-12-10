// @ts-ignore
import { date as qDate } from 'quasar'

export function dateFormat (datetime: string | Date, mask: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return qDate.formatDate(datetime, mask)
}

export function timeFormat (time: string, mask: string = 'HH:mm:ss'): string {
  return qDate.formatDate(
    `'1970-01-01' ${time}`
    , mask)
}

export function dateGetMonthShortName (date: string): string {
  return qDate.formatDate(
    date, 'MMM'
  )
}
