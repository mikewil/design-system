import styles from './StandardTable.module.css'
import React from 'react'
import { Text } from '../Typography/Text'
import { Link, LinkProps } from '../Link/Link'
import { Checkbox, CheckboxInputProps } from '../Checkbox/Checkbox'
import { IconProps } from '../../icons/Icon'
import { Flex } from '../../layout/Flex/Flex'
import clsx from 'clsx'

export type StandardTableCellProps = {
  testId?: string
} & StandardTableStyleProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OmitUnion<T, K extends keyof any> = T extends any ? Omit<T, K> : never

type StandardTableStyleProps =
  | {
      style: 'Text'
      textValue: string
    }
  | {
      style: 'Subtitle'
      title: string
      subtitle: string
    }
  | ({
      style: 'Link'
      textValue: string
    } & OmitUnion<LinkProps, 'children'>)
  | ({
      style: 'Checkbox'
    } & OmitUnion<CheckboxInputProps, 'testId'>)
  | ({
      style: 'Icon'
      icon: React.FC<Omit<IconProps, 'children'>> | null
    } & Omit<IconProps, 'children'>)
  | ({
      style: 'Icon + Text'
      textValue: string
      icon: React.FC<Omit<IconProps, 'children'>>
    } & Omit<IconProps, 'children'>)
  | {
      style: 'Icon + Link'
      textValue: string
      icon: React.FC<Omit<IconProps, 'children'>>
      iconProps: OmitUnion<IconProps, 'children'>
      linkProps: OmitUnion<LinkProps, 'children'>
    }
  | ({
      style: 'Icon + Subtitle'
      title: string
      subtitle: string
      icon: React.FC<Omit<IconProps, 'children'>>
    } & Omit<IconProps, 'children'>)

const CellBase = ({
  children,
  className,
  testId,
}: {
  children: React.ReactNode
  className?: string
  testId?: string
}) => {
  return (
    <td data-testid={testId} className={clsx(styles.cell, className)}>
      {children}
    </td>
  )
}

export const Cell = (props: StandardTableCellProps) => {
  switch (props.style) {
    case 'Text':
      return (
        <CellBase testId={props.testId}>
          <Text variant="body2LowEmphasis">{props.textValue}</Text>
        </CellBase>
      )
    case 'Subtitle':
      return (
        <CellBase testId={props.testId}>
          <Text variant="body2HighEmphasis">{props.title}</Text>
          <Text variant="body2LowEmphasis">{props.subtitle}</Text>
        </CellBase>
      )
    case 'Link':
      const { textValue, ...linkProps } = props
      return (
        <CellBase testId={props.testId}>
          <Link {...linkProps}>{textValue}</Link>
        </CellBase>
      )
    case 'Checkbox':
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        style,
        testId,
        ...checkboxProps
      } = props
      return (
        <CellBase testId={testId}>
          <Checkbox {...checkboxProps} />
        </CellBase>
      )
    case 'Icon': {
      const { testId, icon: Icon, ...iconProps } = props
      return (
        <CellBase testId={testId} className={styles.iconCell}>
          {Icon && <Icon {...iconProps} />}
        </CellBase>
      )
    }
    case 'Icon + Text': {
      const { testId, textValue, icon: Icon, ...iconProps } = props
      return (
        <CellBase testId={testId}>
          <Flex alignItems="center" columnGap={'spacing-3'} wrap="nowrap">
            <Icon {...iconProps} />
            <Text variant="body2LowEmphasis">{textValue}</Text>
          </Flex>
        </CellBase>
      )
    }
    case 'Icon + Link': {
      const { testId, textValue, icon: Icon, iconProps, linkProps } = props
      return (
        <CellBase testId={testId}>
          <Flex alignItems="center" columnGap={'spacing-3'} wrap="nowrap">
            <Icon {...iconProps} size="XS" />
            <Link {...linkProps}>{textValue}</Link>
          </Flex>
        </CellBase>
      )
    }
    case 'Icon + Subtitle': {
      const { title, subtitle, icon: Icon, ...iconProps } = props
      return (
        <CellBase testId={props.testId}>
          <Flex alignItems="center" columnGap={'spacing-3'} wrap="nowrap">
            <Icon {...iconProps} />
            <div>
              <Text variant="body2HighEmphasis">{title}</Text>
              <Text variant="body2LowEmphasis">{subtitle}</Text>
            </div>
          </Flex>
        </CellBase>
      )
    }
    default:
      return null
  }
}
