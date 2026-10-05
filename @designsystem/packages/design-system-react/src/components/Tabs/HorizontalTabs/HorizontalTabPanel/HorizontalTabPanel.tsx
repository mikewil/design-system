import * as React from 'react'
import { TabPanel } from 'react-aria-components'
import { BaseComponentProps } from '../../../BaseComponentProps'
import clsx from 'clsx'
import styles from '../HorizontalTabs.module.css'
import { useStyleProps } from '../../../../utils/useStyles'
import { motion } from 'framer-motion'
import { useAnimationContext } from '../HorizontalTabs'
import { useMediaQuery } from 'react-responsive'

export type DesignSystemHorizontalTabPanelProps = {
  id: string
  children: React.ReactNode
} & BaseComponentProps

export function HorizontalTabPanel({
  id,
  children,
  ...props
}: DesignSystemHorizontalTabPanelProps) {
  const styleProps = useStyleProps(props)
  const { direction } = useAnimationContext()
  const isSmallScreen = useMediaQuery({ query: '(max-width: 959px)' })

  return (
    <TabPanel
      id={id}
      className={clsx('designsystem-HorizontalTabPanel', styles.horizontalTabPanel)}
      style={styleProps}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: !isSmallScreen ? (direction === 'left' ? -32 : 32) : 0,
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </TabPanel>
  )
}
