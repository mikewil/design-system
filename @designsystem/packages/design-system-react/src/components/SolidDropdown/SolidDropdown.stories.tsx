import type { Meta, StoryObj } from '@storybook/react'
import { SolidDropdown, SolidDropdownProps } from './SolidDropdown'
import { useState } from 'react'
import { SolidButton } from '../Buttons/SolidButton/SolidButton'

const meta: Meta<typeof SolidDropdown> = {
  component: SolidDropdown,
}

const dataTestId = 'storybook'
const dataTestIdSingle = 'e2e-example-single'
const dataTestIdMultiple = 'e2e-example-multiple'

export default meta
type Story = StoryObj<typeof SolidDropdown>

const Wrapper = (args: SolidDropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    args.selectedItems ? args.selectedItems : [],
  )
  return (
    <>
      <SolidDropdown
        testId={args.testId}
        selectedItems={selectedItems}
        title={args.title}
        selectionMethod={args.selectionMethod}
        items={args.items}
        setSelectedItems={function (items: string[]) {
          setSelectedItems(items)
        }}
      />

      <p>Selected items: {selectedItems.join(', ')}</p>
    </>
  )
}

const SpecialWrapper = (args: SolidDropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(
    args.selectedItems ? args.selectedItems : [],
  )
  return (
    <>
      <SolidDropdown
        testId={args.testId}
        selectedItems={selectedItems}
        title={args.title}
        selectionMethod={args.selectionMethod}
        items={args.items}
        setSelectedItems={function (items: string[]) {
          setSelectedItems(items)
        }}
      />
      <p>Selected items: {selectedItems.join(', ')}</p>
      <SolidButton
        buttonText="Clear Options"
        onClick={() => setSelectedItems([])}
      ></SolidButton>
    </>
  )
}

export const Primary: Story = {
  render: Wrapper,
  args: {
    testId: dataTestId,
    title: 'Animal',
    items: ['cat', 'dog', 'lizard', 'aardvark', 'Item 3'],
  },
}

export const PreLoaded: Story = {
  render: Wrapper,
  args: {
    testId: dataTestId,
    title: 'Animal',
    items: ['cat', 'dog', 'lizard', 'aardvark', 'Item 3'],
    selectedItems: ['dog', 'lizard'],
    selectionMethod: 'multiple',
  },
}

export const RemoveExternal: Story = {
  render: SpecialWrapper,
  args: {
    testId: dataTestId,
    title: 'Animal',
    items: ['cat', 'dog', 'lizard', 'aardvark', 'Item 3'],
    selectedItems: ['dog', 'lizard'],
    selectionMethod: 'multiple',
  },
}

export const NoItems: Story = {
  render: Wrapper,
  args: {
    testId: dataTestId,
    title: 'Animal',
    items: [],
  },
}

export const Test_e2e_single: Story = {
  render: Wrapper,
  args: {
    testId: dataTestIdSingle,
    title: 'Title',
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectionMethod: 'single',
  },
}

export const Test_e2e_multiple: Story = {
  render: Wrapper,
  args: {
    testId: dataTestIdMultiple,
    title: 'Title',
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectionMethod: 'multiple',
  },
}
