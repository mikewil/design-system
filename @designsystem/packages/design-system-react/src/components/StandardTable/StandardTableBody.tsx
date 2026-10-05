/* eslint-disable react-hooks/rules-of-hooks */
import styles from './StandardTable.module.css'

import { IndeterminateStepper } from '../../animations/IndeterminateStepper/IndeterminateStepper'
import { useEffect, useRef } from 'react'
import React from 'react'
import StandardTable, { StandardTableContext } from './StandardTable'
import { OutlineButton } from '../Buttons/OutlineButton/OutlineButton'

export interface StandardTableBodyProps {
  children: React.ReactNode
  testId?: string
  isLoading?: boolean
  hasMore?: boolean
  loadMore?: () => void
  loadMoreMode?: 'manual' | 'auto'
}

// Define StandardTable.Body component and its props
export const Body = ({
  children,
  testId,
  isLoading,
  hasMore,
  loadMore,
  loadMoreMode = 'auto',
}: StandardTableBodyProps) => {
  const tableContext = React.useContext(StandardTableContext)
  const observerTarget = useRef<HTMLTableRowElement>(null)

  const firstRow = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === StandardTable.Row,
  ) as React.ReactElement | undefined

  let columnCount = firstRow ? React.Children.count(firstRow.props.children) : 1

  if (tableContext.hasClickableRows) {
    columnCount++
  }

  useEffect(() => {
    if (!hasMore || !loadMore || loadMoreMode === 'manual') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loadMore, isLoading, loadMoreMode])

  return (
    <tbody
      data-testid={testId}
      className={styles.body}
      data-isLoading={isLoading}
      data-hasMore={hasMore}
      data-loadMoreMode={loadMoreMode}
    >
      {children}
      {isLoading && (
        <tr className={styles.row} style={{ borderBottom: 'none' }}>
          <td colSpan={columnCount} className={styles.cell}>
            <div className={styles.spinnerContainer} role="progressbar">
              <IndeterminateStepper variant="black" />
            </div>
          </td>
        </tr>
      )}
      {hasMore && !isLoading && loadMoreMode === 'auto' && (
        <tr ref={observerTarget} className={styles.observerRow}>
          <td colSpan={columnCount}></td>
        </tr>
      )}
      {hasMore && !isLoading && loadMoreMode === 'manual' && (
        <tr className={styles.row} style={{ borderBottom: 'none' }}>
          <td
            colSpan={columnCount}
            className={styles.cell}
            style={{ verticalAlign: 'middle', textAlign: 'center' }}
          >
            <OutlineButton onClick={loadMore} buttonText="Show More" />
          </td>
        </tr>
      )}
    </tbody>
  )
}
