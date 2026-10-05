import { render, screen } from '@testing-library/react'
import { TitleBox } from './TitleBox'

describe('TitleBox', () => {
  it('renders with the correct text when selectionMethod is single and no items are selected', () => {
    const title = 'Test Title'
    const selectedItems: string[] = []
    const selectionMethod = 'single'

    render(
      <TitleBox
        title={title}
        selectedItems={selectedItems}
        selectionMethod={selectionMethod}
      />,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with the correct text when selectionMethod is single and an item is selected', () => {
    const title = 'Test Title'
    const selectedItems = ['Test Item']
    const selectionMethod = 'single'

    render(
      <TitleBox
        title={title}
        selectedItems={selectedItems}
        selectionMethod={selectionMethod}
      />,
    )

    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('renders with the correct text when selectionMethod is multiple and no items are selected', () => {
    const title = 'Test Title'
    const selectedItems: string[] = []
    const selectionMethod = 'multiple'

    render(
      <TitleBox
        title={title}
        selectedItems={selectedItems}
        selectionMethod={selectionMethod}
      />,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders with the correct text when selectionMethod is multiple and items are selected', () => {
    const title = 'Test Title'
    const selectedItems = ['Test Item 1', 'Test Item 2']
    const selectionMethod = 'multiple'

    render(
      <TitleBox
        title={title}
        selectedItems={selectedItems}
        selectionMethod={selectionMethod}
      />,
    )

    expect(screen.getByText('Test Title (2)')).toBeInTheDocument()
  })
})
