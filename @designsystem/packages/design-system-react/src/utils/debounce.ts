/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(fn: (...args: any[]) => void, delay = 1000) {
  let timerId: any
  return (...args: any[]) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => fn(...args), delay)
  }
}
