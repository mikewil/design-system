import type { Meta, StoryObj } from '@storybook/react'
import { HorizontalTabs } from './HorizontalTabs'
import { Text } from '../../Typography/Text'
import { TextInput } from '../../TextInput/TextInput'
import { HorizontalTabList } from './HorizontalTabList/HorizontalTabList'
import { HorizontalTab } from './HorizontalTab/HorizontalTab'
import { HorizontalTabPanel } from './HorizontalTabPanel/HorizontalTabPanel'

const meta: Meta<typeof HorizontalTabs> = {
  component: HorizontalTabs,
}

const dataTestId = 'designsystem-horizontal-tabs'

export default meta
type Story = StoryObj<typeof HorizontalTabs>

export const Primary: Story = {
  render: (args) => (
    <HorizontalTabs {...args}>
      <HorizontalTabList>
        <HorizontalTab id="tab1">Tab 1</HorizontalTab>
        <HorizontalTab id="tab2">Tab 2</HorizontalTab>
        <HorizontalTab id="tab3">Tab 3</HorizontalTab>
      </HorizontalTabList>
      <HorizontalTabPanel id="tab1">Tab 1 Content</HorizontalTabPanel>
      <HorizontalTabPanel id="tab2">
        <Text variant="header2HighEmphasis" marginBottom="spacing-3">
          Example Header
        </Text>
        <TextInput label="Example Input" />
        <Text variant="body2LowEmphasis" marginTop="spacing-3">
          Example paragraph
        </Text>
      </HorizontalTabPanel>
      <HorizontalTabPanel id="tab3">Tab 3 Content</HorizontalTabPanel>
    </HorizontalTabs>
  ),
  args: {
    testId: dataTestId,
    selectedTab: 'tab2',
    onChange: () => {},
  },
}
