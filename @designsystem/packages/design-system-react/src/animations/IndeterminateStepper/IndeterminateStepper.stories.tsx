import type { Meta, StoryObj } from '@storybook/react'
import { IndeterminateStepper } from './IndeterminateStepper'

export default {
  component: IndeterminateStepper,
} as Meta

type Story = StoryObj<typeof IndeterminateStepper>

export const Color: Story = {
  args: {
    variant: 'color',
  },
}

export const Black: Story = {
  args: {
    variant: 'black',
  },
}
