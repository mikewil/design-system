import type { Meta, StoryObj } from '@storybook/react'
import { RoundedButton } from './RoundedButton'
import { Products_Sterilizer } from '../../../icons'

const meta: Meta<typeof RoundedButton> = {
  component: RoundedButton,
}

export default meta
type Story = StoryObj<typeof RoundedButton>

const RoundButtonTemplate: Story = {
  render: ({ ...args }) => {
    return (
      <RoundedButton
        state="default"
        buttonText="Button"
        onClick={() => {
          alert('Button clicked')
        }}
        showBadge={true}
        {...args}
      />
    )
  },
  argTypes: {
    layout: {
      type: 'string',
      options: ['image', 'text', 'textimage'],
      control: 'radio',
    },
    ButtonImage: {
      control: false,
    },
  },
}

export const WithIcon: Story = {
  ...RoundButtonTemplate,
  args: {
    layout: 'textimage',
    ButtonImage: Products_Sterilizer,
  },
}

export const NoIcon: Story = {
  ...RoundButtonTemplate,
  args: {
    layout: 'textimage',
  },
}

export const IconOnly: Story = {
  args: {
    ButtonImage: Products_Sterilizer,
    size: 'M',
    layout: 'image',
    state: 'default',
    buttonText: 'Button',
    onClick: () => {
      alert('Button clicked')
    },
    showBadge: true,
  },
  argTypes: {
    layout: {
      control: false,
    },
    size: {
      type: 'string',
      options: ['S', 'M'],
      control: 'radio',
    },
    ButtonImage: {
      control: false,
    },
  },
}
