import type { Meta, StoryObj } from '@storybook/react'
import { InlineNotification } from './InlineNotification'
import { useState } from 'react'
import { fn } from '@storybook/test'

const meta: Meta<typeof InlineNotification> = {
  component: InlineNotification,
}
export default meta
type Story = StoryObj<typeof InlineNotification>

const testId = 'designsystem-inline-notification'

export const Primary: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true)

    const handleCloseClick = () => {
      setVisible(false)
    }

    return (
      <div>
        {visible && (
          <InlineNotification {...args} closeClick={handleCloseClick} />
        )}
      </div>
    )
  },
  args: {
    testId: 'designsystem-inline-notification',
    title: 'Inline Title',
    text: 'We need to make',
    showText: true,
    showTitle: true,
    actionLinkText: 'Action Link',
    showActionLink: true,
    dismissIcon: true,
    actionLinkHref: 'https://www.mydesignsystem.com',
    level: 'information',
    // The closeClick prop will be overridden by the render function
    closeClick: fn(),
  },
}

export const Warning: Story = {
  render: (args) => {
    return (
      <div>
        <InlineNotification {...args}></InlineNotification>
      </div>
    )
  },
  args: {
    testId: testId,
    title: 'WARNING',
    text: 'We need to make',
    showText: true,
    showTitle: true,
    level: 'safety-warning',
    actionLinkText: 'Action Link',
    dismissIcon: true,
    showActionLink: true,
    actionLinkHref: 'https://www.mydesignsystem.com',
    closeClick: fn(),
  },
}
