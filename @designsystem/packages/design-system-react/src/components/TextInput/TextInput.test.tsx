import { render, screen } from '@testing-library/react'
import { TextInput } from './TextInput'

describe('TextInput', () => {
  const testId = 'text-input-test-id'

  it('should not render the label, sub-label, description, or error message by default', () => {
    render(<TextInput testId={testId} />)

    expect(screen.queryByTestId('designsystem-text-input-label')).toBeNull()
    expect(screen.queryByTestId('designsystem-text-input-sub-label')).toBeNull()
    expect(screen.queryByTestId('designsystem-text-input-description')).toBeNull()
    expect(screen.queryByTestId('designsystem-text-input-error-message')).toBeNull()
    expect(screen.queryByTestId('designsystem-text-input-placeholder')).toBeNull()
    expect(
      screen.getByTestId('designsystem-text-input').getAttribute('value'),
    ).toEqual('')
    expect(
      screen.getByTestId('designsystem-text-input').getAttribute('description'),
    ).toBeNull()
    expect(screen.getByTestId(testId).getAttribute('data-required')).toBeNull()
    expect(screen.getByTestId(testId).getAttribute('data-invalid')).toBeNull()
  })

  it('should render the label', () => {
    render(<TextInput testId={testId} label="Test Label" />)
    expect(screen.getByTestId('designsystem-text-input-label').textContent).toEqual(
      'Test Label',
    )
  })

  it('should render the sub-label', () => {
    render(<TextInput testId={testId} subLabel="Test Sub Label" />)
    expect(
      screen.getByTestId('designsystem-text-input-sub-label').textContent,
    ).toEqual('Test Sub Label')
  })

  it('should render the description', () => {
    render(<TextInput testId={testId} description="Test Description" />)
    expect(
      screen.getByTestId('designsystem-text-input-description').textContent,
    ).toEqual('Test Description')
  })

  it('should render the description if it is invalid and does not have an errorMessage', () => {
    render(
      <TextInput testId={testId} description="Test Description" isInvalid />,
    )
    expect(
      screen.getByTestId('designsystem-text-input-description').textContent,
    ).toEqual('Test Description')
  })

  it('should render the input disabled', () => {
    render(<TextInput testId={testId} isDisabled />)
    expect(screen.getByTestId(testId).getAttribute('data-disabled')).toBe(
      'true',
    )
  })

  it('should render the input required', () => {
    render(<TextInput testId={testId} isRequired />)
    expect(screen.getByTestId(testId).getAttribute('data-required')).toBe(
      'true',
    )
  })

  it('should render the input as invalid', () => {
    render(
      <TextInput testId={testId} isInvalid={true} errorMessage="Enter Text" />,
    )
    expect(screen.getByTestId(testId).getAttribute('data-invalid')).toBe('true')
  })

  it('should render the errorMessage when invalid', () => {
    render(<TextInput testId={testId} isInvalid errorMessage="Enter text" />)
    expect(
      screen.getByTestId('designsystem-text-input-error-message').textContent,
    ).toBe('Enter text')
  })

  it('should not render the errorMessage when valid', () => {
    render(<TextInput testId={testId} errorMessage="Enter text" />)
    expect(screen.queryByTestId('designsystem-text-input-error-message')).toBeNull()
  })

  it('should render the value', () => {
    render(<TextInput testId={testId} value="Test Value" />)
    expect(screen.getByTestId('designsystem-text-input').getAttribute('value')).toBe(
      'Test Value',
    )
  })
})
