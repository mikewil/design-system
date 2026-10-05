import { render, fireEvent } from '@testing-library/react'
import { Link } from './Link'
// ...existing imports...

describe('Link component', () => {
  // ...existing tests...

  test('renders standard link correctly', () => {
    const { getByText } = render(
      <Link
        linkType="standard"
        variant="link1LowEmphasis"
        href="https://example.com"
        target="_blank"
      >
        Standard Link
      </Link>,
    )
    const linkElement = getByText('Standard Link').closest('a')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', 'https://example.com')
    expect(linkElement).toHaveAttribute('target', '_blank')
  })

  test('renders click link correctly and triggers onClick', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Link linkType="click" variant="link2LowEmphasis" onClick={handleClick}>
        Click Link
      </Link>,
    )
    const buttonElement = getByText('Click Link').closest('button')
    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('handles single-spa navigation', () => {
    const pushStateSpy = jest.spyOn(window.history, 'pushState')
    const { getByText } = render(
      <Link linkType="single-spa" variant="link1LowEmphasis" href="/new-route">
        Single SPA Link
      </Link>,
    )
    const linkElement = getByText('Single SPA Link').closest('a')
    expect(linkElement).toBeInTheDocument()
    fireEvent.click(linkElement!)
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '/new-route')
    pushStateSpy.mockRestore()
  })
})
