import { render, screen } from '@testing-library/react'
import { StyledListBoxItem } from './StyledListBoxItem'
import { ListBox } from 'react-aria-components'

describe('StyledListBoxItem', () => {
  it('renders with the correct text', () => {
    const item = { value: 'Test Item' }
    const selectedItems: string[] = []
    const selectedKey = null
    const styles = {}

    render(
      <ListBox aria-label="test-label">
        <StyledListBoxItem
          selectionMethod="single"
          onClick={jest.fn()}
          item={item}
          selectedItems={selectedItems}
          selectedKey={selectedKey}
          styles={styles}
        />
      </ListBox>,
    )

    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('applies the correct variant when selected', () => {
    const item = { value: 'Test Item' }
    const selectedItems = ['Test Item']
    const selectedKey = null
    const styles = {}

    render(
      <ListBox aria-label="test-label">
        <StyledListBoxItem
          selectionMethod="single"
          onClick={jest.fn()}
          item={item}
          selectedItems={selectedItems}
          selectedKey={selectedKey}
          styles={styles}
        />
      </ListBox>,
    )

    expect(screen.getByText('Test Item')).toHaveClass('body2HighEmphasis')
  })

  it('applies the correct variant when not selected', () => {
    const item = { value: 'Test Item' }
    const selectedItems: string[] = []
    const selectedKey = null
    const styles = {}

    render(
      <ListBox aria-label="test-label">
        <StyledListBoxItem
          item={item}
          selectionMethod="single"
          onClick={jest.fn()}
          selectedItems={selectedItems}
          selectedKey={selectedKey}
          styles={styles}
        />
      </ListBox>,
    )

    expect(screen.getByText('Test Item')).toHaveClass(
      'body2LowEmphasis primary',
    )
  })
})
