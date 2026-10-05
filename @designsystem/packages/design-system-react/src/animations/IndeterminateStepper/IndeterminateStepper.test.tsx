import { render } from '@testing-library/react'
import { IndeterminateStepper } from './IndeterminateStepper'

describe('IndeterminateStepper', () => {
  it('renders without crashing', () => {
    const { container } = render(<IndeterminateStepper />)
    expect(container).toBeInTheDocument()
  })

  it('renders color variant correctly', () => {
    const { container } = render(<IndeterminateStepper variant="color" />)
    expect(container).toBeInTheDocument()
  })

  it('renders black variant correctly', () => {
    const { container } = render(<IndeterminateStepper variant="black" />)
    expect(container).toBeInTheDocument()
  })
})
