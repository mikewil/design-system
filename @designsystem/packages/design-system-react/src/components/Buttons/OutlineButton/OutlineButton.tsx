import clsx from 'clsx'
import { IconPropsWithoutChildren } from '../../../icons/Icon'
import { FC, useState } from 'react'
import { Button } from 'react-aria-components'
import { IndeterminateSpinner, Navigation_Close } from '../../../index'
import { BaseComponentProps } from '../../BaseComponentProps'
import styles from './OutlineButton.module.css'
import { useStyleProps } from '../../../utils/useStyles'

export type SelectionStatus = 'open' | 'closed'

type OutlineButtonProps = {
  buttonText?: string
  variant?: 'default' | 'selection'
  isDisabled?: boolean
  isInProgress?: boolean
  LeadingImage?: FC<IconPropsWithoutChildren>
  FollowingImage?: FC<IconPropsWithoutChildren>
  onClick?: () => void
}

export function OutlineButton({
  testId,
  buttonText,
  variant = 'default',
  isDisabled,
  isInProgress,
  LeadingImage,
  FollowingImage,
  onClick,
  ...otherProps
}: OutlineButtonProps & BaseComponentProps) {
  const [selectionStatus, setSelectionStatus] = useState<
    SelectionStatus | undefined
  >(variant === 'selection' ? 'closed' : undefined)
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    if (variant === 'selection') {
      setSelectionStatus((prevState) => {
        if (prevState === undefined) {
          return 'closed'
        }
        if (prevState === 'open') {
          return 'closed'
        } else {
          return 'open'
        }
      })
    }
  }
  const styleProps = useStyleProps(otherProps)
  return (
    <Button
      data-testid={testId}
      data-variant={variant}
      style={styleProps}
      className={clsx(
        styles.outlineButton,
        styles[variant],
        selectionStatus !== undefined && !isInProgress
          ? styles[selectionStatus]
          : '',
        isDisabled ? styles['disabled'] : '',
        isInProgress ? styles['progress'] : '',
      )}
      onPress={isDisabled || isInProgress ? () => {} : handleClick}
    >
      {isInProgress ? (
        <IndeterminateSpinner
          variant={'black'}
          size="small"
          testId={`${testId}-spinner`}
        />
      ) : (
        <>
          {LeadingImage && <LeadingImage testId="leading-image" size="XXXS" />}
          <span>{buttonText}</span>
          {variant === 'default' ? (
            FollowingImage && (
              <FollowingImage testId="following-image" size="XXXS" />
            )
          ) : selectionStatus === 'closed' ? (
            FollowingImage && (
              <>
                <div className={styles.buttonText}></div>
                <FollowingImage testId="following-image" size="XXXS" />
              </>
            )
          ) : (
            <>
              <div className={styles.buttonText}></div>
              <Navigation_Close size="XXXS" testId="close-icon" />
            </>
          )}
        </>
      )}
    </Button>
  )
}
