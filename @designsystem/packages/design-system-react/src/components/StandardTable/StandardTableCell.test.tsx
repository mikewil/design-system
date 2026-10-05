import { render, screen, fireEvent } from '@testing-library/react'
import { Cell } from './StandardTableCell'

describe('StandardTableCell', () => {
  it('renders Text style correctly', () => {
    const { getByText } = render(<Cell style="Text" textValue="Sample Text" />)
    expect(getByText('Sample Text')).toBeInTheDocument()
  })

  it('renders Subtitle style correctly', () => {
    const { getByText } = render(
      <Cell style="Subtitle" title="Title" subtitle="Subtitle" />,
    )
    expect(getByText('Title')).toBeInTheDocument()
    expect(getByText('Subtitle')).toBeInTheDocument()
  })

  it('renders Checkbox style correctly', () => {
    const handleClick = jest.fn()
    render(
      <Cell
        style="Checkbox"
        checked={false}
        disabled={false}
        indeterminate={false}
        onClick={handleClick}
      />,
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(checkbox).not.toBeDisabled()

    fireEvent.click(checkbox)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
