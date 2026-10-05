import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from './Flex'
import { Card } from '../../components/Card/Card'
import { Products_Sterilizer } from '../../icons'

const meta: Meta<typeof Flex> = {
  component: Flex,
  parameters: {
    percy: { skip: true },
  },
}

export default meta
type Story = StoryObj<typeof Flex>

export const ResponsiveCardsWithFlex: Story = {
  args: { gap: 'spacing-3', wrap: 'wrap' },
  render: (args) => (
    <Flex {...args}>
      <Card
        flexBasis={{ S: '100%', M: '32%' }}
        title="Item 1"
        subtitle="123"
        titleIcon={Products_Sterilizer}
        isImageVisible
        headerStyle="Subtitle"
        showStatusBar={true}
        statusType="Success"
        detailStyle="content"
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
      />
      <Card
        flexBasis={{ S: '100%', M: '32%' }}
        title="Item 1"
        subtitle="123"
        titleIcon={Products_Sterilizer}
        isImageVisible
        headerStyle="Subtitle"
        showStatusBar={true}
        statusType="Success"
        detailStyle="content"
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
      />
      <Card
        flexBasis={{ S: '100%', M: '32%' }}
        title="Item 1"
        subtitle="123"
        titleIcon={Products_Sterilizer}
        isImageVisible
        headerStyle="Subtitle"
        showStatusBar={true}
        statusType="Success"
        detailStyle="content"
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
      />
    </Flex>
  ),
}

export const Column: Story = {
  args: {
    direction: 'column',
    rowGap: 'spacing-3',
    gap: 'spacing-2',
  },
  render: (args) => (
    <Flex {...args}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  ),
}
