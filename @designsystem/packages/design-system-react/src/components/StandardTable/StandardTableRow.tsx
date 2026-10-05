import styles from './StandardTable.module.css'
import clsx from 'clsx'
import React from 'react'
import { StandardTableContext } from './StandardTable'
import { Navigation_RightCaret } from '../../icons'

export type StandardTableRowProps =
  | {
      children: React.ReactNode
      testId?: string
      /**
       * Adds an arrow icon to the row to indicate it's clickable.
       * Not usable with `onSelect` and `isSelected`.
       */
      onClick?: () => void

      /**
       * Adds a status indicator to the row.
       * Not usable with `onSelect` and `isSelected`.
       */
      status?: 'Warning' | 'Error' | 'Success' | 'Information' | 'None'
      onSelect?: undefined
      isSelected?: undefined
    }
  | {
      children: React.ReactNode
      testId?: string
      onSelect: () => void
      isSelected: boolean
      onClick?: undefined
      status?: undefined
    }

export const Row = (props: StandardTableRowProps) => {
  const { children, testId } = props

  const isClickable = !!props.onClick

  const { setHasClickableRows } = React.useContext(StandardTableContext)

  React.useEffect(() => {
    if (isClickable) {
      setHasClickableRows(true)
    }
  }, [isClickable, setHasClickableRows])

  const rowClassName = clsx(styles.row, {
    [styles.clickableRow]: isClickable,
    [styles[`status${props.status}`]]: props.status,
    [styles.selectedRow]: props.isSelected,
  })

  const handleClick = props.onClick || props.onSelect

  return (
    <tr
      data-testid={testId}
      data-status={props.status}
      className={rowClassName}
      onClick={handleClick}
    >
      {children}
      {isClickable && (
        <td className={styles.iconCell}>
          <Navigation_RightCaret color="General/foreground-secondary" />
        </td>
      )}
    </tr>
  )
}
