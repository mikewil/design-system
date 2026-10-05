import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  cancelButtonTestId,
  collapsedSearchButtonTestId,
  expandedSearchButtonTestId,
  intermediateSpinnerTestId,
  searchFieldTestId,
  SolidSearch,
} from './SolidSearch'

describe('SolidSearch', () => {
  const onSearchMock = jest.fn()
  const onCancelMock = jest.fn()

  beforeEach(() => {
    onSearchMock.mockClear()
    onCancelMock.mockClear()
  })

  it('OnKeyPressed search mode', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    render(
      <SolidSearch
        searchMode="onKeyPressed"
        horizontalAlignment="leftJustified"
        onSearch={onSearchMock}
        onCancel={onCancelMock}
        isLoading={false}
      />,
    )

    // Assert
    const searchField = screen.getByTestId(searchFieldTestId)
    expect(searchField.classList).toContain('searchField')
    expect(searchField.classList).not.toContain('expanded')

    await user.click(screen.getByTestId(collapsedSearchButtonTestId))
    expect(searchField.classList).toContain('expanded')

    const input = screen.getByRole('searchbox')
    expect(input).toHaveValue('')

    expect(screen.getByTestId(cancelButtonTestId)).toBeVisible()
    expect(screen.queryByTestId(intermediateSpinnerTestId)).toBeNull()

    await user.type(input, 'user')
    expect(screen.getByRole('searchbox')).toHaveValue('user')
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(1))

    await user.click(screen.getByTestId(expandedSearchButtonTestId))
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(2))

    await user.click(screen.getByTestId(cancelButtonTestId))
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByTestId(searchFieldTestId).classList).not.toContain(
      'expanded',
    )
  })

  it('OnEnterKeyPressed search mode', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    render(
      <SolidSearch
        searchMode="onEntered"
        horizontalAlignment="leftJustified"
        onSearch={onSearchMock}
        onCancel={onCancelMock}
        isLoading={false}
      />,
    )

    // Assert
    const searchField = screen.getByTestId(searchFieldTestId)
    expect(searchField.classList).toContain('searchField')
    expect(searchField.classList).not.toContain('expanded')

    await user.click(screen.getByTestId(collapsedSearchButtonTestId))
    expect(searchField.classList).toContain('expanded')

    const input = screen.getByRole('searchbox')
    expect(input).toHaveValue('')

    expect(screen.getByTestId(cancelButtonTestId)).toBeVisible()
    expect(screen.queryByTestId(intermediateSpinnerTestId)).toBeNull()

    await user.type(input, 'user')
    expect(screen.getByRole('searchbox')).toHaveValue('user')
    await waitFor(() => expect(onSearchMock).not.toHaveBeenCalled())

    await user.type(screen.getByRole('searchbox'), '{enter}')
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(1))

    await user.click(screen.getByTestId(expandedSearchButtonTestId))
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(2))

    await user.click(screen.getByTestId(cancelButtonTestId))
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByTestId(searchFieldTestId).classList).not.toContain(
      'expanded',
    )
  })

  it('should show intermediate spinner', async () => {
    // Arrange
    const user = userEvent.setup()

    // Act
    render(
      <SolidSearch
        searchMode="onEntered"
        horizontalAlignment="leftJustified"
        onSearch={onSearchMock}
        onCancel={onCancelMock}
        isLoading={true}
      />,
    )

    // Assert
    await user.click(screen.getByTestId(collapsedSearchButtonTestId))
    await user.type(screen.getByRole('searchbox'), 'user')
    expect(screen.getByTestId(intermediateSpinnerTestId)).toBeVisible()
    expect(screen.queryByTestId(cancelButtonTestId)).toBeNull()
  })
})
