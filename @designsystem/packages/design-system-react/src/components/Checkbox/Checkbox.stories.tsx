import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxState, Checkbox } from './Checkbox'
import { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

// A wrapper component to manage state for the checkbox
const CheckboxWrapper = () => {
  const [currentState, setCurrentState] = useState<CheckboxState>('default')

  const handleClick = () => {
    setCurrentState((prevState) => {
      if (prevState === 'default') return 'checked'
      if (prevState === 'checked') return 'indeterminate'
      if (prevState === 'indeterminate') return 'default'
      return prevState
    })
  }

  return (
    <Checkbox
      testId="designsystem-checkbox"
      checked={currentState === 'checked' || currentState === 'indeterminate'}
      indeterminate={currentState === 'indeterminate'}
      disabled={currentState === 'disabled'}
      onClick={handleClick}
    />
  )
}

// Define the story using the wrapper component
export const Primary: Story = {
  render: () => <CheckboxWrapper />,
}

// Define the story using the wrapper component
export const Disabled: Story = {
  render: () => (
    <Checkbox
      testId="designsystem-checkbox-disabled"
      disabled={true}
      checked={false}
      indeterminate={false}
    />
  ),
}
