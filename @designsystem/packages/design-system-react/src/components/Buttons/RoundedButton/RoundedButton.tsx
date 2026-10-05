import { FC } from 'react'
import { Button } from 'react-aria-components'
import '../../../theme.css'
import styles from './RoundedButton.module.css'

import clsx from 'clsx'
import { IconPropsWithoutChildren } from '../../../icons/Icon'
import { IndeterminateSpinner } from '../../../index'
import { getClass } from '../../../utils/classMaps'
import { useStyleProps } from '../../../utils/useStyles'
import { BaseComponentProps } from '../../BaseComponentProps'

type RoundedButtonCommonProps = {
  buttonText?: string
  state?: 'default' | 'disabled' | 'progress'
  ButtonImage?: FC<IconPropsWithoutChildren>
  showBadge?: boolean
  onClick?: () => void
} & BaseComponentProps

type ImageButtonSize = 'S' | 'M' | undefined

export type RoundedButtonProps =
  | (RoundedButtonCommonProps & {
      layout?: 'text' | 'textimage'
    })
  | (RoundedButtonCommonProps & {
      layout?: 'image'
      size?: ImageButtonSize
    })

export function RoundedButton({
  testId,
  buttonText,
  state = 'default',
  ButtonImage,
  showBadge,
  onClick,
  ...otherProps
}: RoundedButtonProps) {
  const style = useStyleProps(otherProps)
  const layout = otherProps.layout ?? 'textimage'
  let size: ImageButtonSize
  if (otherProps.layout === 'image') {
    size = otherProps.size ?? 'M'
  }
  return (
    <Button
      onPress={
        state === 'disabled' || state === 'progress' ? () => {} : onClick
      }
      className={clsx(
        styles.roundedButton,
        getClass(styles, state),
        getClass(styles, layout),
        styles[`size${size}`],
      )}
      data-testid={testId}
      style={style}
    >
      {(layout === 'textimage' ||
        (layout === 'text' && state !== 'progress')) && (
        <span>{buttonText}</span>
      )}
      {state === 'progress' ? (
        <IndeterminateSpinner
          variant="white"
          size="small"
          testId="designsystem-indeterminate-spinner"
        />
      ) : (
        <>
          {ButtonImage && layout !== 'text' && (
            <div className={getClass(styles, 'badgeWrapper')}>
              <span className={styles.iconWrapper}>
                <ButtonImage testId="buttonImage" />
              </span>
              {showBadge && (
                <div
                  data-testid={'badge'}
                  className={getClass(styles, 'badge')}
                ></div>
              )}
            </div>
          )}
        </>
      )}
    </Button>
  )
}
