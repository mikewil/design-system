import { render, screen } from '@testing-library/react'
import { Text } from './Text'
import { TextTester } from '@designsystem/design-system-react-testing'

describe('Text', () => {
  const text = 'Test text'
  const testId = 'text-test-id'

  it('should match the snapshot', () => {
    const { asFragment } = render(<Text>{text}</Text>)
    expect(asFragment).toMatchSnapshot()
  })

  it('should display the correct text', () => {
    render(<Text testId={testId}>{text}</Text>)

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.textContent).toBe(text)
  })

  it('should render as a div by default', () => {
    render(<Text testId={testId}>{text}</Text>)

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('DIV')
  })

  it('should render as an h1 when variant is header1HighEmphasis', () => {
    render(
      <Text testId={testId} variant="header1HighEmphasis">
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('H1')
  })

  it('should render as an h2 when variant is header2LowEmphasis', () => {
    render(
      <Text testId={testId} variant="header2LowEmphasis">
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('H2')
  })

  it('should render as an h2 when variant is header2HighEmphasis', () => {
    render(
      <Text testId={testId} variant="header2HighEmphasis">
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('H2')
  })

  it('should render as an h3 when variant is header3LowEmphasis', () => {
    render(
      <Text testId={testId} variant="header3LowEmphasis">
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('H3')
  })

  it('should render as an h3 when variant is header3HighEmphasis', () => {
    render(
      <Text testId={testId} variant="header3HighEmphasis">
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.tagName).toBe('H3')
  })

  it('should be styled inline when inline is false', () => {
    render(<Text testId={testId}>{text}</Text>)

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.isInline).toBe(false)
  })

  it('should be styled inline when inline is true', () => {
    render(
      <Text testId={testId} inline>
        {text}
      </Text>,
    )

    const textElement = new TextTester(screen.getByTestId(testId))
    expect(textElement.isInline).toBe(true)
  })
})
