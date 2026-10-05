import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'
// ...existing imports...

const meta: Meta<typeof Link> = {
  component: Link,
}

export default meta
type Story = StoryObj<typeof Link>

export const Standard: Story = {
  name: 'Standard Link',
  args: {
    linkType: 'standard',
    variant: 'link1LowEmphasis',
    href: 'https://example.com',
    target: '_blank',
    children: 'Standard Link',
  },
}

export const StandardLink2: Story = {
  name: 'Standard Link',
  args: {
    linkType: 'standard',
    variant: 'link2LowEmphasis',
    href: 'https://example.com',
    target: '_blank',
    children: 'Standard Link',
  },
}

export const Click: Story = {
  name: 'Click Link',
  args: {
    linkType: 'click',
    variant: 'link1LowEmphasis',
    onClick: () => alert('Clicked!'),
    children: 'Click Link',
  },
  parameters: {
    percy: { skip: true },
  },
}

export const SingleSpa: Story = {
  name: 'Single SPA Link',
  args: {
    linkType: 'single-spa',
    variant: 'link1LowEmphasis',
    href: '/new-route',
    children: 'Single SPA Link',
  },
  parameters: {
    percy: { skip: true },
  },
}
