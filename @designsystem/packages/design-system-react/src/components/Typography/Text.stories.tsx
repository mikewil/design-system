import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  component: Text,
}

export default meta
type Story = StoryObj<typeof Text>

export const Text1: Story = {
  name: 'Default Text',
  args: {
    children: 'Default Text',
    inline: true,
  },
}

export const Text2: Story = {
  name: 'Header 1 - Primary',
  args: {
    variant: 'header1HighEmphasis',
    style: 'primary',
    children: 'Header 1',
  },
}

export const Text3: Story = {
  name: 'Overline 1 - Secondary',
  args: {
    variant: 'overline1MediumEmphasis',
    style: 'secondary',
    children: 'Overline 1',
  },
}

export const Text4: Story = {
  name: 'Nested Text',
  args: {
    children: <p style={{ border: '1px solid black' }}>Nested Text</p>,
  },
}
