import { DesignSystemTextFieldProps, TextInput } from './TextInput'
import { type Meta, type StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
}

export default meta
type Story = StoryObj<typeof TextInput>

const Wrapper = (args: DesignSystemTextFieldProps) => {
  const [inputValue, setInputValue] = useState(args.value || '')

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
  }

  return (
    <div>
      <TextInput {...args} value={inputValue} onChange={handleInputChange} />
      <p>Value: {inputValue}</p>
    </div>
  )
}

export const Empty: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    testId: 'designsystem-text-input',
    label: 'Title',
    subLabel: 'Subtitle',
    description: 'Assistive Text',
    isRequired: true,
    placeholder: 'Example Text',
  },
}

export const Entered: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    testId: 'designsystem-text-input',
    label: 'Title',
    subLabel: 'Subtitle',
    description: 'Assistive Text',
    isRequired: true,
    value: 'Example Text',
  },
}

export const Error: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    testId: 'designsystem-text-input',
    label: 'Title',
    subLabel: 'Subtitle',
    description: 'Assistive Text',
    isRequired: true,
    isInvalid: true,
    errorMessage: 'This field is required',
  },
}

export const Locked: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    testId: 'designsystem-text-input',
    label: 'Title',
    subLabel: 'Subtitle',
    description: 'Assistive Text',
    value: 'Example Text',
    isRequired: true,
    isInvalid: true,
    isDisabled: true,
  },
}
