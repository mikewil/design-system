import { getClass } from './classMaps'

describe('getClass', () => {
  const mockStyles = {
    default: 'default',
    progress: 'progress',
    disabled: 'disabled',
    'hover-state': 'hover-state',
  }

  test('returns correct class for "default" variant', () => {
    const result = getClass(mockStyles, 'default')
    expect(result).toBe('default')
  })

  test('returns correct class for "progress" variant', () => {
    const result = getClass(mockStyles, 'progress')
    expect(result).toBe('progress')
  })

  test('returns correct class for "disabled" variant', () => {
    const result = getClass(mockStyles, 'disabled')
    expect(result).toBe('disabled')
  })

  test('returns correct class for "hover-state" variant', () => {
    const result = getClass(mockStyles, 'hover-state')
    expect(result).toBe('hover-state')
  })

  test('falls back to variant name if class is missing', () => {
    const incompleteStyles = {
      default: 'default',
      progress: 'progress',
    }

    expect(getClass(incompleteStyles, 'default')).toBe('default')
    expect(getClass(incompleteStyles, 'progress')).toBe('progress')
    expect(getClass(incompleteStyles, 'disabled')).toBe('disabled')
    expect(getClass(incompleteStyles, 'hover-state')).toBe('hover-state')
  })
})

describe('getClass', () => {
  const mockStyles = {
    primary: 'primary',
    secondary: 'secondary',
  }

  test('returns correct class for "primary" style', () => {
    const result = getClass(mockStyles, 'primary')
    expect(result).toBe('primary')
  })

  test('returns correct class for "secondary" style', () => {
    const result = getClass(mockStyles, 'secondary')
    expect(result).toBe('secondary')
  })

  test('falls back to style name if class is missing', () => {
    const incompleteStyles = {
      primary: 'primary',
    }

    expect(getClass(incompleteStyles, 'primary')).toBe('primary')
    expect(getClass(incompleteStyles, 'secondary')).toBe('secondary')
  })
})
