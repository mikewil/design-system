import { Meta, StoryObj } from '@storybook/react'
import { ResponsiveRow } from './ResponsiveRow'
import { Products_DesignSystemProduct } from '../../icons'
import { Text } from '../../components/Typography/Text'
import { SolidSearch } from '../../components/Search/SolidSearch/SolidSearch'
import { SolidButton } from '../../components/Buttons/SolidButton/SolidButton'

export default {
  component: ResponsiveRow,
  parameters: {
    percy: { skip: true },
  },
} as Meta<typeof ResponsiveRow>

type Story = StoryObj<typeof ResponsiveRow>

const boxStyle = {
  width: '100px',
  height: '50px',
  backgroundColor: '#e0e0e0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
}

export const Default: Story = {
  render: (args) => (
    <ResponsiveRow {...args}>
      <Products_DesignSystemProduct size="S" />
      <Text variant="header-2-low-emphasis">345 Products</Text>

      <ResponsiveRow.WrapTogether>
        <ResponsiveRow.Split />
        <SolidSearch
          searchMode="onKeyPressed"
          horizontalAlignment="rightJustified"
          isLoading={false}
          onSearch={() => {}}
          onCancel={() => {}}
        />
        <SolidButton buttonText="Button" />
      </ResponsiveRow.WrapTogether>
    </ResponsiveRow>
  ),
  args: {},
}

export const WithSplit: StoryObj<typeof ResponsiveRow> = {
  render: (args) => (
    <ResponsiveRow {...args}>
      <div style={boxStyle}>Left Item</div>
      <ResponsiveRow.Split />
      <div style={boxStyle}>Right Item</div>
    </ResponsiveRow>
  ),
  args: {},
}

export const WithWrapTogether: StoryObj<typeof ResponsiveRow> = {
  render: (args) => (
    <ResponsiveRow {...args}>
      <div style={boxStyle}>Item 1</div>
      <ResponsiveRow.WrapTogether>
        <div style={boxStyle}>Item 2</div>
        <div style={boxStyle}>Item 3</div>
      </ResponsiveRow.WrapTogether>
      <div style={boxStyle}>Item 4</div>
    </ResponsiveRow>
  ),
  args: {},
}
