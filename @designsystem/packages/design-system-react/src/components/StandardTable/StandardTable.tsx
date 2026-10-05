import styles from './StandardTable.module.css'
import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import { Header, StandardTableHeaderProps } from './StandardTableHeader'
import { Body, StandardTableBodyProps } from './StandardTableBody'
import { Row, StandardTableRowProps } from './StandardTableRow'
import { Column, StandardTableColumnProps } from './StandardTableColumn'
import { Cell, StandardTableCellProps } from './StandardTableCell'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'
import './StandardTable.scrollbartheme.css'

// Define the context interface
interface StandardTableContextProps {
  hasClickableRows: boolean
  setHasClickableRows: (value: boolean) => void
}

// Create the context
export const StandardTableContext = createContext<StandardTableContextProps>({
  hasClickableRows: false,
  setHasClickableRows: () => {},
})

export interface StandardTableProps {
  children: React.ReactNode
  /**
   * Test ID used for e2e and unit testing
   */
  testId?: string

  /**
   * The variant of the table
   */
  variant?: 'Standard' | 'Alternating Rows'
}

const StandardTable: React.FC<StandardTableProps> & {
  Header: React.FC<StandardTableHeaderProps>
  Body: React.FC<StandardTableBodyProps>
  Row: React.FC<StandardTableRowProps>
  Column: React.FC<StandardTableColumnProps>
  Cell: React.FC<StandardTableCellProps>
} = ({ children, testId, variant = 'Standard' }) => {
  const tableClassName = clsx(styles.table, {
    [styles.tableAlternatingRows]: variant === 'Alternating Rows',
  })

  const [hasClickableRows, setHasClickableRows] = useState(false)

  return (
    <StandardTableContext.Provider
      value={{
        hasClickableRows,
        setHasClickableRows,
      }}
    >
      <OverlayScrollbarsComponent
        className={styles.tableWrapper}
        options={{
          overflow: { y: 'scroll' },
          scrollbars: {
            theme: 'table-scrollbar-theme',
          },
        }}
      >
        <table data-testid={testId} className={tableClassName}>
          {children}
        </table>
      </OverlayScrollbarsComponent>
    </StandardTableContext.Provider>
  )
}

StandardTable.Header = Header
StandardTable.Body = Body
StandardTable.Row = Row
StandardTable.Column = Column
StandardTable.Cell = Cell

export default StandardTable
