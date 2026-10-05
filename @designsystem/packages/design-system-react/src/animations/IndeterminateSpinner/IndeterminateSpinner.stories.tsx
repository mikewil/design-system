import type { Meta, StoryObj } from '@storybook/react'
import { IndeterminateSpinner } from './IndeterminateSpinner'

export default {
  title: 'Animations/Progress + Status',
  component: IndeterminateSpinner,
} as Meta

type Story = StoryObj<typeof IndeterminateSpinner>

export const Black: Story = {
  args: {
    variant: 'black',
  },
}

export const White: Story = {
  args: {
    variant: 'white',
  },
}

export const Color: Story = {
  args: {
    variant: 'color',
  },
}
