import { render } from '@testing-library/react'
import { RadioGroup } from './RadioGroup'
import { RadioGroupTester } from '@designsystem/design-system-react-testing'

describe('RadioGroup Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1', dataTestId: 'radio-option-1' },
    {
      value: 'option2',
      label: 'Option 2',
      dataTestId: 'radio-option-2',
      isDisabled: false,
    },
    {
      value: 'option3',
      label: 'Option 3',
      dataTestId: 'radio-option-3',
      isDisabled: true,
    },
  ]

  it('should have the correct radio button selected based on initial value', () => {
    const { getByRole } = render(
      <RadioGroup
        label="Test Radio Group"
        options={options}
        onChange={() => {}}
        selectedValue="option2"
      />,
    )

    const radioGroupElement = getByRole('radiogroup')
    const groupTester = new RadioGroupTester(radioGroupElement)

    // Verify that the correct button is initially selected
    expect(groupTester.isSelected('option2')).toBe(true)
    expect(groupTester.isSelected('option1')).toBe(false)
  })

  it('should correctly disable specified radio buttons', () => {
    const { getByRole } = render(
      <RadioGroup
        label="Test Radio Group"
        options={options}
        onChange={() => {}}
        selectedValue="option1"
      />,
    )

    const radioGroupElement = getByRole('radiogroup')
    const groupTester = new RadioGroupTester(radioGroupElement)

    // Check if 'option3' is disabled
    expect(groupTester.isDisabled('option3')).toBe(true)

    // Check if 'option2' is not disabled
    expect(groupTester.isDisabled('option2')).toBe(false)
  })
})
