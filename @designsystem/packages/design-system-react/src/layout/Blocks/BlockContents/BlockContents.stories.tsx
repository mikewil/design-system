import { Meta, StoryObj } from '@storybook/react/'
import { useState } from 'react'
import { Actions_Edit } from '../../../icons'
import { BlockContents } from './BlockContents'

const meta: Meta<typeof BlockContents> = {
  component: BlockContents,
  argTypes: {
    layout: {
      type: 'string',
      options: ['head', 'details', 'headAction', 'detailsAction'],
      control: 'radio',
    },
    ButtonImage: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof BlockContents>

const BlockContentsTemplate: Story = {
  render: ({ ...args }) => {
    const [buttonClicked, setButtonClicked] = useState<boolean>()
    return (
      <div style={{ width: 300 }}>
        <BlockContents
          {...args}
          actionLink="https://example.com"
          onButtonClicked={() => setButtonClicked(true)}
          ButtonImage={Actions_Edit}
          header="header"
          text="Text"
        />
        {buttonClicked && (
          <div style={{ paddingTop: 20 }} data-testid="button-clicked">
            Button Clicked!
          </div>
        )}
      </div>
    )
  },
}

export const Head: Story = {
  ...BlockContentsTemplate,
  args: {
    layout: 'headAction',
  },
}

export const Details: Story = {
  ...BlockContentsTemplate,
  args: {
    layout: 'detailsAction',
  },
}
