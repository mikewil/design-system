import type { Meta, StoryObj } from '@storybook/react'
import { SolidButton } from './SolidButton'
import { Products_Sterilizer } from '../../../icons'

const meta: Meta<typeof SolidButton> = {
  component: SolidButton,
}
const dataTestId = 'designsystem-solid-button'

export default meta
type Story = StoryObj<typeof SolidButton>

export const Primary: Story = {
  args: {
    variant: 'default',
    style: 'primary',
    testId: dataTestId,
    buttonText: 'Button',
    onClick: () => {
      alert('Button clicked')
    },
  },
}

export const LeftIcon: Story = {
  args: {
    variant: 'default',
    style: 'primary',
    buttonText: 'Button',
    testId: dataTestId,
    leadingImage: Products_Sterilizer,
    onClick: () => {
      alert('Button clicked')
    },
  },
}

export const RightIcon: Story = {
  args: {
    variant: 'default',
    style: 'primary',
    buttonText: 'Button',
    testId: dataTestId,
    followingImage: Products_Sterilizer,
    onClick: () => {
      alert('Button clicked')
    },
  },
}

export const BothIcons: Story = {
  args: {
    variant: 'default',
    style: 'primary',
    buttonText: 'Button',
    testId: dataTestId,
    leadingImage: Products_Sterilizer,
    followingImage: Products_Sterilizer,
    onClick: () => {
      alert('Button clicked')
    },
  },
}
