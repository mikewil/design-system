import styles from './StandardTable.module.css'
import React from 'react'
import { StandardTableContext } from './StandardTable'

export interface StandardTableHeaderProps {
  children: React.ReactNode
  testId?: string
}

// Define StandardTable.Header component and its props
export const Header = ({ children, testId }: StandardTableHeaderProps) => {
  const { hasClickableRows } = React.useContext(StandardTableContext)

  return (
    <thead data-testid={testId} className={styles.header}>
      <tr>
        {children}
        {hasClickableRows && <th className={styles.iconHeaderCell} />}
      </tr>
    </thead>
  )
}
