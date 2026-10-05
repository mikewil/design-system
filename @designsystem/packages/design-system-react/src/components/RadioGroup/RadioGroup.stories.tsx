import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'
import { useState } from 'react'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    onChange: { action: 'changed' },
  },
}

export default meta

// Define the story type
type Story = StoryObj<typeof RadioGroup>

// Create a default story with multiple radio buttons
export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.selectedValue)

    return (
      <RadioGroup
        {...args}
        selectedValue={selectedValue}
        onChange={(value: string) => {
          setSelectedValue(value)
          action('onChange')(value)
        }}
      />
    )
  },
  args: {
    testId: 'designsystem-radiogroup',
    label: 'Title',
    options: [
      { label: 'Option 1', value: 'option1', isDisabled: false },
      { label: 'Option 2', value: 'option2', isDisabled: false },
      { label: 'Option 3', value: 'option3', isDisabled: false },
    ],
  },
}
