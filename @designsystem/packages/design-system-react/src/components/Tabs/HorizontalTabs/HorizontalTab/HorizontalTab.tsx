import { Tab } from 'react-aria-components'
import { Text } from '../../../Typography/Text'
import { BaseComponentProps } from '../../../BaseComponentProps'
import { useStyleProps } from '../../../../utils/useStyles'
import clsx from 'clsx'
import styles from '../HorizontalTabs.module.css'

export type DesignSystemHorizontalTabProps = {
  id: string
  children: string
} & BaseComponentProps

export function HorizontalTab({
  id,
  children,
  ...props
}: DesignSystemHorizontalTabProps) {
  const styleProps = useStyleProps(props)

  return (
    <Tab
      id={id}
      className={clsx('designsystem-HorizontalTab', styles.horizontalTab)}
      style={styleProps}
      {...props}
    >
      {({ isSelected }) => (
        <Text
          variant="overline1HighEmphasis"
          color={
            isSelected
              ? 'Navigation/navigation-tertiary'
              : 'General/foreground-secondary'
          }
        >
          {children}
        </Text>
      )}
    </Tab>
  )
}
