export default class StorageProxy {
  storage: any

  /**
   *
   * @param storage {LocalStorage} // https://quasar-framework.org/components/web-storage.html
   */
  constructor (storage: any) {
    this.storage = storage
  }

  /**
   *
   * @param key {String}
   */
  get (key: string) {
    return this.storage.get.item(key)
  }

  /**
   *
   * @param key {String}
   * @param value
   */
  set (key: string, value: any) {
    this.storage.set(key, value)
  }

  /**
   *
   * @param key {String}
   */
  remove (key: string) {
    this.storage.remove(key)
  }
}
