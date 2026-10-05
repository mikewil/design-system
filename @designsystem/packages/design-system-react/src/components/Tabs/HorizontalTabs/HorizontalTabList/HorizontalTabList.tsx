import { TabList, TabsContext, useSlottedContext } from 'react-aria-components'
import { DesignSystemHorizontalTabProps } from '../HorizontalTab/HorizontalTab'
import { Text } from '../../../Typography/Text'
import { BaseComponentProps } from '../../../BaseComponentProps'
import { ReactElement, useState } from 'react'
import clsx from 'clsx'
import styles from '../HorizontalTabs.module.css'
import { useStyleProps } from '../../../../utils/useStyles'
import { motion } from 'framer-motion'
import { useAnimationContext } from '../HorizontalTabs'
import { useMediaQuery } from 'react-responsive'
import { Navigation_UpCaret } from '../../../../icons'

export interface Position {
  x: number
  y: number
  width: number
}

export type DesignSystemHorizontalTabListProps = {
  testId?: string
  id?: string
  children:
    | ReactElement<DesignSystemHorizontalTabProps>[]
    | ReactElement<DesignSystemHorizontalTabProps>
} & BaseComponentProps

export function HorizontalTabList({
  children,
  testId,
  ...props
}: DesignSystemHorizontalTabListProps) {
  const { position, ref, state } = useAnimationContext()
  const tabsContext = useSlottedContext(TabsContext)
  const styleProps = useStyleProps(props)
  const isSmallScreen = useMediaQuery({ query: '(max-width: 959px)' })
  const selectedItem = state.collection.getItem(state.selectedKey ?? '')

  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen((open) => !open)

  return isSmallScreen ? (
    <>
      <div className={clsx(styles.horizontalTabListMenu)}>
        <button
          className={clsx(
            styles.horizontalTabListMenuButton,
            isOpen ? styles.open : '',
          )}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <Text
            variant="overline1HighEmphasis"
            color="Navigation/navigation-tertiary"
          >
            {selectedItem?.textValue}
          </Text>
        </button>
        <Navigation_UpCaret
          rotation={isOpen ? 0 : -180}
          color="Navigation/navigation-tertiary"
        />
      </div>

      {isOpen && (
        <ul className={clsx(styles.horizontalTabListItems)} role="listbox">
          {[...state.collection].map(
            (item) =>
              item.key !== state.selectedKey && (
                <li key={item.key} role="option">
                  <button
                    className={clsx(styles.horizontalTabListItemButton)}
                    onClick={() => {
                      if (tabsContext?.onSelectionChange) {
                        tabsContext.onSelectionChange(item.key)
                      }
                      setIsOpen(false)
                    }}
                  >
                    <Text
                      variant="overline1HighEmphasis"
                      color="General/foreground-secondary"
                    >
                      {item.textValue}
                    </Text>
                  </button>
                </li>
              ),
          )}
        </ul>
      )}
    </>
  ) : (
    <>
      <TabList
        ref={ref}
        data-testid={testId}
        className={clsx('designsystem-HorizontalTabList', styles.horizontalTabList)}
        style={styleProps}
      >
        {children}
      </TabList>

      {position && (
        <motion.div
          className={styles.horizontalTabIndicator}
          animate={{ x: position.x - 16, width: position.width }}
          transition={{ x: { bounce: 0, duration: 0.3 } }}
          style={{
            x: position.x,
            y: position.y,
            width: position.width,
          }}
        />
      )}
    </>
  )
}
