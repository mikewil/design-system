import { render, fireEvent } from '@testing-library/react'
import StandardTable from './StandardTable'

test('renders StandardTable with sub-components', () => {
  const { getByRole } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row>
          <StandardTable.Cell style="Text" textValue="Data 1" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )

  expect(getByRole('table')).toBeInTheDocument()
})

test('applies the correct class for Alternating Rows variant', () => {
  const { getByRole } = render(
    <StandardTable variant="Alternating Rows">
      <StandardTable.Header>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
        <StandardTable.Column>Title</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row>
          <StandardTable.Cell style="Text" textValue="Data 1" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
          <StandardTable.Cell style="Text" textValue="Data 2" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )
  expect(getByRole('table')).toHaveClass('tableAlternatingRows')
})

test('calls onClick handler when a row is clicked', () => {
  const handleRowClick = jest.fn()
  const { getByText } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Title</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row onClick={handleRowClick}>
          <StandardTable.Cell style="Text" textValue="Row Content" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )
  const row = getByText('Row Content').closest('tr')
  if (row) {
    fireEvent.click(row)
  }
  expect(handleRowClick).toHaveBeenCalledTimes(1)
})

test('calls onSortChange when sortable column header is clicked', () => {
  const handleSortChange = jest.fn()
  const { getByText } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column onSortChange={handleSortChange}>
          Name
        </StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row>
          <StandardTable.Cell style="Text" textValue="Item 1" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )

  fireEvent.click(getByText('Name'))

  expect(handleSortChange).toHaveBeenCalledTimes(1)
})

test('calls onSelect handler when a selectable row is clicked', () => {
  const handleSelect = jest.fn()
  const { getByText } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Name</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row onSelect={handleSelect} isSelected={false}>
          <StandardTable.Cell style="Text" textValue="Selectable Row" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )
  const row = getByText('Selectable Row').closest('tr')
  if (row) {
    fireEvent.click(row)
  }
  expect(handleSelect).toHaveBeenCalledTimes(1)
})

test('shows loading spinner when isLoading is true', () => {
  const { container } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Name</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body isLoading={true}>
        <StandardTable.Row>
          <StandardTable.Cell style="Text" textValue="Row Content" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )
  expect(container.querySelector('.spinnerContainer')).toBeInTheDocument()
})

test('shows "Load More" button when loadMoreMode is "manual"', () => {
  const handleLoadMore = jest.fn()
  const { getByText } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Name</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body
        hasMore={true}
        loadMore={handleLoadMore}
        loadMoreMode="manual"
      >
        <StandardTable.Row>
          <StandardTable.Cell style="Text" textValue="Row Content" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )
  const loadMoreButton = getByText('Show More')
  fireEvent.click(loadMoreButton)
  expect(handleLoadMore).toHaveBeenCalledTimes(1)
})

test('adds extra column when rows are clickable', () => {
  const { getByRole } = render(
    <StandardTable>
      <StandardTable.Header>
        <StandardTable.Column>Name</StandardTable.Column>
      </StandardTable.Header>
      <StandardTable.Body>
        <StandardTable.Row onClick={() => {}}>
          <StandardTable.Cell style="Text" textValue="Row Content" />
        </StandardTable.Row>
      </StandardTable.Body>
    </StandardTable>,
  )

  const table = getByRole('table')
  const headers = table.querySelectorAll('thead th')
  expect(headers.length).toBe(2) // Original column + extra icon column
})
