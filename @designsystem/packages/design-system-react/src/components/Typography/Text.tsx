import * as React from 'react'
import styles from './Text.module.css'
import { getClass } from '../../utils/classMaps'
import { BaseComponentProps } from '../BaseComponentProps'
import { useStyleProps } from '../../utils/useStyles'
import clsx from 'clsx'

export type TextProps = {
  variant?:
    | 'header1HighEmphasis'
    | 'header2LowEmphasis'
    | 'header2HighEmphasis'
    | 'header3LowEmphasis'
    | 'header3HighEmphasis'
    | 'body1LowEmphasis'
    | 'body1HighEmphasis'
    | 'body2LowEmphasis'
    | 'body2HighEmphasis'
    | 'body2Italics'
    | 'body3LowEmphasis'
    | 'body3HighEmphasis'
    | 'body3Italics'
    | 'captionLowEmphasis'
    | 'overline1MediumEmphasis'
    | 'overline1HighEmphasis'
    | 'overline2MediumEmphasis'
    | 'overline2HighEmphasis'
    | 'buttonLowEmphasis'
    | 'buttonHighEmphasis'
    | 'buttonUnderline1LowEmphasis'
    | 'buttonUnderline2LowEmphasis'
    | 'link1LowEmphasis'
    | 'link2LowEmphasis'
    | 'link3LowEmphasis'
  style?: 'primary' | 'secondary'
  inline?: boolean
  children: React.ReactNode
} & Omit<BaseComponentProps, 'style'>

export function Text({
  testId,
  variant = 'body1LowEmphasis',
  style = 'primary',
  inline = false,
  children,
  ...otherProps
}: TextProps) {
  otherProps.color ??= 'General/foreground-primary'
  const styleProps = useStyleProps(otherProps)
  // Map variants to corresponding HTML elements
  const Tag = (() => {
    switch (variant) {
      case 'header1HighEmphasis':
        return 'h1'
      case 'header2LowEmphasis':
      case 'header2HighEmphasis':
        return 'h2'
      case 'header3LowEmphasis':
      case 'header3HighEmphasis':
        return 'h3'
      default: // Defaults to a div
        return 'div'
    }
  })()

  return (
    <Tag
      data-testid={testId}
      data-variant={variant}
      data-style={style}
      data-isinline={inline}
      style={styleProps}
      className={clsx(
        'designsystem-Text',
        styles[variant],
        styles[style],
        inline ? getClass(styles, 'inline') : '',
      )}
    >
      {children}
    </Tag>
  )
}
