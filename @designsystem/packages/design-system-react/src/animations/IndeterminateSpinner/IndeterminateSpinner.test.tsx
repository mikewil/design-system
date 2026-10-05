import { render, screen } from '@testing-library/react'
import { IndeterminateSpinner } from './IndeterminateSpinner'
import { IndeterminateSpinnerTester } from '@designsystem/design-system-react-testing'

describe('IndeterminateSpinner', () => {
  const testId = 'designsystem-indeterminate-spinner'
  it('renders with default props', () => {
    render(<IndeterminateSpinner testId={testId} />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.variant).toEqual('black')
    expect(spinner.size).toEqual('large')
    expect(spinner.width).toEqual(96)
    expect(spinner.height).toEqual(96)
  })

  it('renders with variant prop white', () => {
    render(<IndeterminateSpinner testId={testId} variant="white" />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.variant).toEqual('white')
  })

  it('renders with variant prop black', () => {
    render(<IndeterminateSpinner testId={testId} variant="black" />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.variant).toEqual('black')
  })

  it('renders with size prop small', () => {
    render(<IndeterminateSpinner testId={testId} size="small" />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.variant).toEqual('black')
    expect(spinner.size).toEqual('small')
  })

  it('renders with size prop medium', () => {
    render(<IndeterminateSpinner testId={testId} size="medium" />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.size).toEqual('medium')
  })

  it('renders with size prop large', () => {
    render(<IndeterminateSpinner testId={testId} size="large" />)

    const spinner = new IndeterminateSpinnerTester(screen.getByTestId(testId))

    expect(spinner.size).toEqual('large')
  })
})
