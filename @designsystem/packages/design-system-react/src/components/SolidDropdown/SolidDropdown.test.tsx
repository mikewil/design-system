import { render } from '@testing-library/react'
import { SolidDropdown } from './SolidDropdown'
import { SolidDropdownTester } from '@designsystem/design-system-react-testing'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

describe('SolidDropdown - Single Selection', () => {
  let tester: SolidDropdownTester
  const testId = 'test-dropdown-1'

  const TestComponent = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    return (
      <SolidDropdown
        title="Test Dropdown"
        selectionMethod="single"
        items={['Item 1', 'Item 2', 'Item 3']}
        testId={testId}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    )
  }

  // Initial State
  it('should display the correct initial state', () => {
    const { container } = render(<TestComponent />)
    tester = new SolidDropdownTester(
      container.querySelector(
        `[data-testid=${testId}-solid-dropdown]`,
      ) as HTMLElement,
      userEvent.setup(),
    )

    expect(tester.title).toBe('Test Dropdown')
    expect(tester.isExpanded(testId)).toBe(false)
    expect(tester.getItems(testId)).toEqual([])
  })

  // Interaction
  it('should open the dropdown and select an item', async () => {
    const { container } = render(<TestComponent />)
    tester = new SolidDropdownTester(
      container.querySelector(
        `[data-testid=${testId}-solid-dropdown]`,
      ) as HTMLElement,
      userEvent.setup(),
    )

    // Open the dropdown
    await tester.toggleDropdown(testId)
    await tester.selectItem('Item 2')
    await tester.toggleDropdown(testId)
    expect(tester.title).toBe('Item 2')
  })
})

describe('SolidDropdown - Multiple Selection', () => {
  let tester: SolidDropdownTester
  const testId = 'test-dropdown-2'
  const user = userEvent.setup()

  const TestComponent = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    return (
      <SolidDropdown
        title="Test Dropdown - Multiple Selection"
        selectionMethod="multiple"
        items={['Item 1', 'Item 2', 'Item 3']}
        testId={testId}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    )
  }

  beforeEach(() => {
    const { container } = render(<TestComponent />)
    tester = new SolidDropdownTester(
      container.querySelector(
        `[data-testid=${testId}-solid-dropdown]`,
      ) as HTMLElement,
      user,
    )
  })

  it('should open the dropdown and select an item', async () => {
    expect(tester.title).toBe('Test Dropdown - Multiple Selection')

    await tester.toggleDropdown(testId)
    await tester.selectItem('Item 2')
    await tester.selectItem('Item 1')
    await tester.selectItem('Item 3')
    await tester.selectItem('Item 1')

    expect(tester.getItems(testId)).toEqual(['Item 1', 'Item 2', 'Item 3'])
    expect(tester.isExpanded(testId)).toBe(true)
    expect(tester.title).toBe('Test Dropdown - Multiple Selection (2)')
  })
})
