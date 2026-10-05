import styles from './StandardTable.module.css'
import { Text } from '../Typography/Text'
import clsx from 'clsx'
import { Actions_SortAscending, Actions_SortDescending } from '../../icons'

// Export the prop interfaces
export type StandardTableColumnProps =
  | {
      children: string
      testId?: string
      onSortChange?: undefined
      type?: 'Standard'
    }
  | {
      children: string
      testId?: string
      onSortChange: () => void
      sortDirection?: 'asc' | 'desc'
      empty?: false
      type?: 'Sortable'
    }
  | {
      testId?: string
      type: 'Icon'
    }

export const Column = (props: StandardTableColumnProps) => {
  if (props.type === 'Icon') {
    return (
      <th
        data-testid={props.testId}
        className={clsx(styles.column, styles.iconColumn)}
      />
    )
  }
  const { children, testId, onSortChange } = props

  let sortDirection = undefined

  if (onSortChange) {
    sortDirection = props.sortDirection
  }

  const handleSortChange = () => {
    if (onSortChange) {
      onSortChange()
    }
  }

  const renderSortIcon = () => {
    if (sortDirection === 'asc') {
      return <Actions_SortAscending />
    } else if (sortDirection === 'desc') {
      return <Actions_SortDescending />
    }
    return null
  }

  const content = (
    <>
      {children}
      {renderSortIcon()}
    </>
  )

  return (
    <th
      data-testid={testId}
      className={clsx(styles.column, {
        [styles.sortableColumn]: onSortChange,
      })}
      data-sortDirection={sortDirection}
      data-sortable={!!onSortChange}
      onClick={onSortChange ? handleSortChange : undefined}
    >
      <Text
        color={
          sortDirection
            ? 'Navigation/navigation-tertiary'
            : 'General/foreground-secondary'
        }
        variant="overline1HighEmphasis"
      >
        {content}
      </Text>
    </th>
  )
}
