import type { StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { Products_Sterilizer } from './index'

export default {
  title: 'Icons/Icons',
  component: Icon,
}

type Story = StoryObj<typeof Icon>

export const XXXS: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XXXS',
  },
}

export const XXS: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XXS',
  },
}

export const XS: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XS',
  },
}

export const S: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'S',
  },
}

export const M: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'M',
  },
}

export const L: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'L',
  },
}

export const XL: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XL',
  },
}

export const XXL: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XXL',
  },
}

export const XXXL: Story = {
  render: (args) => <Products_Sterilizer {...args} />,
  args: {
    size: 'XXXL',
  },
}
