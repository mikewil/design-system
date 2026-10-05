import { Checkbox } from './Checkbox'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxTester } from '@designsystem/design-system-react-testing'

describe('CheckboxInput', () => {
  const testId = 'designsystem-checkbox'

  it('should render the checkbox unchecked', () => {
    const { getByTestId } = render(
      <Checkbox
        testId={testId}
        checked={false}
        disabled={false}
        indeterminate={false}
        onClick={() => {}}
      />,
    )

    const checkboxElement = new CheckboxTester(getByTestId(testId))

    expect(checkboxElement.isChecked).toBe(false)
    expect(checkboxElement.isMultiple).toBe(false)
    expect(checkboxElement.isDisabled).toBe(false)
  })

  it('should render the checkbox checked', () => {
    const { getByTestId } = render(
      <Checkbox
        testId={testId}
        checked={true}
        disabled={false}
        indeterminate={false}
        onClick={() => {}}
      />,
    )

    const checkboxElement = new CheckboxTester(getByTestId(testId))

    expect(checkboxElement.isChecked).toBe(true)
    expect(checkboxElement.isMultiple).toBe(false)
  })

  it('should render the checkbox disabled', () => {
    const { getByTestId } = render(
      <Checkbox
        testId={testId}
        checked={false}
        disabled={true}
        indeterminate={false}
        onClick={() => {}}
      />,
    )

    const checkboxElement = new CheckboxTester(getByTestId(testId))

    expect(checkboxElement.isChecked).toBe(false)
    expect(checkboxElement.isMultiple).toBe(false)
    expect(checkboxElement.isDisabled).toBe(true)
  })

  it('should render the checkbox in the multiple state', () => {
    const { getByTestId } = render(
      <Checkbox
        testId={testId}
        checked={false}
        disabled={false}
        indeterminate={true}
        onClick={() => {}}
      />,
    )

    const checkboxElement = new CheckboxTester(getByTestId(testId))

    expect(checkboxElement.isChecked).toBe(false)
    expect(checkboxElement.isMultiple).toBe(true)
  })

  test('calls onClick when clicked if not disabled', () => {
    const handleClick = jest.fn()

    render(
      <Checkbox
        testId="test-checkbox"
        checked={false}
        indeterminate={false}
        disabled={false}
        onClick={handleClick}
      />,
    )

    const checkboxInput = screen.getByRole('checkbox')
    fireEvent.click(checkboxInput)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn()

    render(
      <Checkbox
        testId="test-checkbox-disabled"
        checked={false}
        indeterminate={false}
        disabled={true}
        onClick={handleClick}
      />,
    )

    const checkbox = screen.getByTestId('test-checkbox-disabled')
    fireEvent.click(checkbox)

    expect(handleClick).not.toHaveBeenCalled()
  })
})
