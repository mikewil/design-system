import { Button } from 'react-aria-components'
import React, { FC } from 'react'
import '../../../theme.css'
import styles from './Chip.module.css'

import { getClass } from '../../../utils/classMaps'
import { Navigation_Close } from '../../../icons'
import { BaseComponentProps } from '../../BaseComponentProps'
import { useStyleProps } from '../../../utils/useStyles'
import clsx from 'clsx'
import { IconPropsWithoutChildren } from '../../../icons/Icon'

export type ChipProps = {
  /**
   * The text to be displayed in the chip.
   */
  chipText?: string

  /**
   * The state of the chip. 'single' for single selection, 'multiple' for multiple selection.
   */
  variant?: 'single' | 'multiple'

  /**
   * Whether to show the image in the chip.
   */
  showIcon?: boolean

  /**
   * The image to be displayed in the chip.
   */
  chipIcon?: FC<IconPropsWithoutChildren>

  /**
   * Whether the chip is selected.
   */
  selected?: boolean

  /**
   * The function to be called when the chip is clicked.
   *
   * @example
   * onClick: () => {}
   */
  onClick?: () => void
} & BaseComponentProps

/**
 * `Chip` is a customizable chip component.
 */
export function Chip({
  testId,
  chipText,
  variant: variant = 'single',
  showIcon,
  chipIcon: ChipIcon,
  selected,
  onClick,
  ...otherProps
}: ChipProps) {
  const [isSelected, setIsSelected] = React.useState(
    variant === 'single' ? selected : false,
  )

  const style = useStyleProps(otherProps)

  if (ChipIcon && !showIcon) {
    showIcon = true
  }

  const handleClick = () => {
    if (variant === 'single') {
      setIsSelected(!isSelected)
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Button
      className={clsx(
        getClass(styles, 'chip'),
        getClass(styles, variant),
        isSelected ? getClass(styles, 'selected') : '',
        testId,
      )}
      data-testid={testId}
      data-variant={variant}
      onPress={handleClick}
      aria-pressed={isSelected}
      style={style}
    >
      {variant === 'single' ? (
        <>
          {showIcon && ChipIcon && <ChipIcon size="XXXS" testId="chip-icon" />}
          {chipText}
        </>
      ) : (
        <>
          <div
            className={`${getClass(styles, 'chip')} ${getClass(styles, 'textContainer')}`}
          >
            {showIcon && ChipIcon && (
              <ChipIcon size="XXXS" testId="chip-icon" />
            )}
            {chipText}
          </div>
          <span
            className={`${getClass(styles, 'closeIcon')} ${getClass(styles, 'container')}`}
          >
            <Navigation_Close size="XXXS" testId="close-icon" />
          </span>
        </>
      )}
    </Button>
  )
}
