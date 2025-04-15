export const debounce = (callback, waitTime) => {
  let timeoutId = null
  return (...params) => {
    window.clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...params)
    }, waitTime)
  }
}