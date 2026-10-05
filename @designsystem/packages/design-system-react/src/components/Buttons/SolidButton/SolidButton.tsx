import { Button } from 'react-aria-components'
import { FC } from 'react'
import styles from './SolidButton.module.css'
import { IconPropsWithoutChildren } from '../../../icons/Icon'
import { IndeterminateSpinner } from '../../../index'
import { getClass } from '../../../utils/classMaps'
import { useStyleProps } from '../../../utils/useStyles'
import clsx from 'clsx'
import { BaseComponentProps } from '../../BaseComponentProps'

type SolidButtonProps = {
  testId?: string
  buttonText?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  progress?: boolean
  leadingImage?: FC<IconPropsWithoutChildren>
  followingImage?: FC<IconPropsWithoutChildren>
  onClick?: () => void
} & BaseComponentProps

export function SolidButton({
  testId,
  buttonText,
  variant = 'primary',
  disabled = false,
  progress = false,
  followingImage: FollowingImage,
  leadingImage: LeadingImage,
  onClick,
  ...otherProps
}: SolidButtonProps) {
  const styleProps = useStyleProps(otherProps)

  return (
    <Button
      data-testid={testId}
      onPress={disabled || progress ? () => {} : onClick}
      className={clsx(
        styles.solidButton,
        getClass(styles, variant),
        getClass(styles, disabled ? 'disabled' : ''),
        getClass(styles, progress ? 'progress' : ''),
      )}
      style={styleProps}
    >
      {progress ? (
        <IndeterminateSpinner
          variant={variant == 'primary' ? 'white' : 'black'}
          size="small"
        />
      ) : (
        <>
          {LeadingImage && <LeadingImage testId="leading-image" size="XXXS" />}
          <span>{buttonText}</span>
          {FollowingImage && (
            <FollowingImage testId="following-image" size="XXXS" />
          )}
        </>
      )}
    </Button>
  )
}
