import { debounce } from './debounce'

jest.useFakeTimers()

describe('debounce', () => {
  let fn: jest.Mock
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let debouncedFn: (...args: any[]) => void

  beforeEach(() => {
    fn = jest.fn()
    debouncedFn = debounce(fn, 1000) // set delay to 1000ms
  })

  it('should delay the function call by the specified delay', () => {
    debouncedFn('test')

    // Fast-forward time but not to the full delay
    jest.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()

    // Fast-forward remaining time to reach the delay
    jest.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledWith('test')
  })

  it('should cancel previous call if debounced again within delay', () => {
    debouncedFn('first')
    jest.advanceTimersByTime(500)
    debouncedFn('second') // Call debounce function again

    jest.advanceTimersByTime(500) // now 1000ms since first call, but it should not trigger
    expect(fn).not.toHaveBeenCalled() // fn shouldn't be called yet due to second call

    jest.advanceTimersByTime(500) // additional time to reach second call's delay
    expect(fn).toHaveBeenCalledWith('second') // fn should now be called with 'second'
    expect(fn).toHaveBeenCalledTimes(1) // Ensure it's only called once
  })

  it('should call the function only once if multiple calls are made in quick succession', () => {
    debouncedFn('call1')
    debouncedFn('call2')
    debouncedFn('call3')

    jest.runAllTimers() // Fast-forward all timers

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('call3') // Only the last call should be executed
  })

  afterEach(() => {
    jest.clearAllTimers()
  })
})
