import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { Button, Input, SearchField } from 'react-aria-components'
import { Actions_Search, Navigation_Close } from '../../../icons'
import { IndeterminateSpinner } from '../../../index'
import { getClass } from '../../../utils/classMaps'
import { debounce } from '../../../utils/debounce'
import { BaseComponentProps } from '../../BaseComponentProps'
import styles from './SolidSearch.module.css'

export type SolidSearchProps = {
  searchMode: 'onEntered' | 'onKeyPressed'
  horizontalAlignment: 'leftJustified' | 'rightJustified'
  onSearch: (value: string | undefined) => void
  onCancel: () => void
  isLoading: boolean
} & BaseComponentProps

export const collapsedSearchButtonTestId = 'designsystem-search-button-collapsed'
export const expandedSearchButtonTestId = 'designsystem-search-button-expanded'
export const cancelButtonTestId = 'designsystem-cancel-button'
export const searchFieldTestId = 'designsystem-search-field'
export const intermediateSpinnerTestId = 'designsystem-intermediate-spinner'
export const solidSearchContainerTestId = 'designsystem-solid-search-container'

export function SolidSearch({
  onSearch,
  onCancel,
  isLoading,
  searchMode,
  horizontalAlignment,
}: SolidSearchProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const expandSearchFieldHandler = () => {
    setIsCollapsed(!isCollapsed)
  }
  const searchDebounce: (value: string | undefined) => void = useMemo(
    () =>
      debounce((value: string | undefined) => {
        if (searchMode === 'onKeyPressed') {
          onSearch(value)
        }
      }, 300),
    [onSearch, searchMode],
  )
  const handleValueChanged = (value: string | undefined) => {
    setSearchValue(value)
    searchDebounce(value)
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchValue)
    }
  }
  const handleSearchClick = () => {
    onSearch(searchValue)
  }
  const handleCancel = () => {
    setIsCollapsed(true)
    setSearchValue(undefined)
    onCancel()
  }
  return (
    <div
      className={clsx(
        styles.container,
        getClass(styles, horizontalAlignment),
        !isCollapsed && styles.expanded,
      )}
      data-searchmode={searchMode}
      data-alignment={horizontalAlignment}
      data-testid={solidSearchContainerTestId}
    >
      {isCollapsed && (
        <Button
          data-testid={collapsedSearchButtonTestId}
          onPress={expandSearchFieldHandler}
          className={clsx(styles.iconButton, styles.searchIcon)}
        >
          <Actions_Search />
        </Button>
      )}
      <SearchField
        aria-label="search"
        data-testid={searchFieldTestId}
        className={clsx(styles.searchField, !isCollapsed && styles.expanded)}
      >
        <Button
          className={clsx(styles.button, styles.searchIcon)}
          onPress={() => handleSearchClick()}
          data-testid={expandedSearchButtonTestId}
        >
          <Actions_Search />
        </Button>
        <Input
          aria-label="search"
          className={clsx(
            styles.searchInput,
            !isCollapsed ? styles.expanded : '',
            !!searchValue ? styles['textEntered'] : '',
          )}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleValueChanged(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {!!searchValue && isLoading ? (
          <div className={styles.spinnerContainer}>
            <IndeterminateSpinner testId={intermediateSpinnerTestId} />
          </div>
        ) : (
          <Button
            className={clsx(
              styles.button,
              styles.cancelButton,
              !isCollapsed && styles.expanded,
            )}
            onPress={handleCancel}
            data-testid={cancelButtonTestId}
          >
            <Navigation_Close />
          </Button>
        )}
      </SearchField>
    </div>
  )
}
