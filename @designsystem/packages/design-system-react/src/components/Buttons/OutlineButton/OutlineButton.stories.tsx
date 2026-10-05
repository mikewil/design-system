import { Meta, StoryObj } from '@storybook/react/'
import { Symbols_Image } from '../../../icons/index'
import { OutlineButton } from './OutlineButton'
import { useState } from 'react'

const meta: Meta<typeof OutlineButton> = {
  component: OutlineButton,
}

export default meta
type Story = StoryObj<typeof OutlineButton>

const OutlineButtonTemplate: Story = {
  render: ({ ...args }) => {
    const [buttonClicked, setButtonClicked] = useState<boolean>(false)
    return (
      <>
        <OutlineButton
          {...args}
          buttonText="Button"
          onClick={() => setButtonClicked(true)}
          testId="designsystem-outline-button"
        />
        {buttonClicked && (
          <div style={{ padding: 10 }} data-testid="storybook-button-clicked">
            Button Clicked
          </div>
        )}
      </>
    )
  },
}

export const Default: Story = {
  ...OutlineButtonTemplate,
  args: {
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
}

export const Selection: Story = {
  ...OutlineButtonTemplate,
  args: {
    variant: 'selection',
    FollowingImage: Symbols_Image,
  },
  argTypes: {
    variant: {
      control: false,
    },
  },
}
