/**
 * Basically setTimeout that returns promise.
 *
 * @param {Number | undefined} time
 * @returns {Promise}
 */
export function sleep (time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
