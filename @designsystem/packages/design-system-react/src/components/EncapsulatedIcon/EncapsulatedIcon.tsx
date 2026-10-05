import { clsx } from 'clsx'
import { FC } from 'react'
import { Button } from 'react-aria-components'
import { IconPropsWithoutChildren, IconSize } from '../../icons/Icon'
import { useStyleProps } from '../../utils/useStyles'
import { BaseComponentProps } from '../BaseComponentProps'
import styles from './EncapsulatedIcon.module.css'

type IconContainerSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

type EncapsulatedIconProps = {
  Icon: FC<IconPropsWithoutChildren>
  size?: IconContainerSize
}

function getIconSize(containerSize: IconContainerSize): IconSize {
  switch (containerSize) {
    case 'XXL':
      return 'XXXL'
    case 'XL':
      return 'XL'
    case 'L':
    case 'M':
      return 'M'
    case 'S':
      return 'S'
    case 'XS':
    case 'XXS':
      return 'XS'
    default:
      return 'S'
  }
}

export function EncapsulatedIcon({
  Icon,
  size = 'S',
  testId,
  ...otherProps
}: EncapsulatedIconProps & BaseComponentProps) {
  const styleProps = useStyleProps(otherProps)
  return (
    <Button
      {...otherProps}
      data-testid={`${testId}-container`}
      className={clsx(styles.iconContainer, styles['iconContainerSize' + size])}
      style={styleProps}
    >
      <Icon testId={testId} size={getIconSize(size)} />
    </Button>
  )
}
