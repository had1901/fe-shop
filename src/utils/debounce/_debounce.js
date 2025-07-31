export const debounce = (callback, delay) => {
  let timeoutId = null
  return (...params) => {
    window.clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...params)
    }, delay)
  }
}