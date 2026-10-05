import { Meta, StoryObj } from '@storybook/react/'
import { EncapsulatedIcon } from './EncapsulatedIcon'
import { Symbols_Image } from '../../icons'

const meta: Meta<typeof EncapsulatedIcon> = {
  component: EncapsulatedIcon,
}

export default meta
type Story = StoryObj<typeof EncapsulatedIcon>

export const Default: Story = {
  args: {
    Icon: Symbols_Image,
    size: 'S',
  },
  argTypes: {
    Icon: {
      control: false,
    },
  },
}
