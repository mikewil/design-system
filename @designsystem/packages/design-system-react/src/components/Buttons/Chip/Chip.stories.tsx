import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'
import { Text } from '../../Typography/Text'
import { Products_Sterilizer } from '../../../icons'
import { useState } from 'react'
import { SolidDropdown } from '../../SolidDropdown/SolidDropdown'

const meta: Meta<typeof Chip> = {
  component: Chip,
}

export default meta
type Story = StoryObj<typeof Chip>

export const Primary: Story = {
  render: (args) => {
    const [message, setMessage] = useState('')

    const handleClick = () => {
      setMessage((prevMessage) => (prevMessage ? '' : 'Button was clicked!'))
      if (args.onClick) {
        args.onClick()
      }
    }

    return (
      <>
        <Chip {...args} onClick={handleClick} />
        {message && <Text variant="body1LowEmphasis"> {message} </Text>}
      </>
    )
  },
  args: {
    variant: 'single',
    chipIcon: Products_Sterilizer,
    chipText: 'Button',
    testId: 'designsystem-chip',
    onClick: () => {},
  },
}

export const NoIcon: Story = {
  render: (args) => {
    const [message, setMessage] = useState('')

    const handleClick = () => {
      // Toggle the message on and off
      setMessage((prevMessage) => (prevMessage ? '' : 'Button was clicked!'))
      if (args.onClick) {
        args.onClick()
      }
    }

    return (
      <>
        <Chip {...args} onClick={handleClick} />
        {message && <Text variant="body1LowEmphasis"> {message} </Text>}
      </>
    )
  },
  args: {
    variant: 'single',
    chipText: 'Button',
    testId: 'designsystem-chip',
    onClick: () => {},
  },
}

export const Multiple: Story = {
  args: {
    variant: 'multiple',
    chipText: 'Button',
  },
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([
      'Item 1',
      'Item 3',
    ])

    // Handler for adding/removing items in the dropdown
    const handleSelectionChange = (newSelectedItems: string[]) => {
      setSelectedItems(newSelectedItems)
    }

    // Handler for removing a chip
    const handleChipRemove = (item: string) => {
      const updatedSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item,
      )
      setSelectedItems(updatedSelectedItems)
    }

    return (
      <div style={{ padding: '20px' }}>
        {/* Render SolidDropdown */}
        <SolidDropdown
          testId="dropdown"
          title="Title"
          items={[
            'Item 1',
            'Loooooonnnnnngggggggggggggggggggg Item 2',
            'Item 3',
            'Item 4',
          ]}
          selectionMethod="multiple"
          {...args}
          selectedItems={selectedItems}
          setSelectedItems={handleSelectionChange}
        />

        {/* Render selected items as Chips */}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          {selectedItems.map((item) => (
            <Chip
              key={item}
              variant="multiple"
              chipIcon={item === 'Item 1' ? Products_Sterilizer : undefined}
              chipText={item}
              testId={'designsystem-chip'}
              onClick={() => handleChipRemove(item)}
            />
          ))}
        </div>
      </div>
    )
  },
}
