import { useRef } from 'react'
import styles from './Checkbox.module.css'
import { getClass } from '../../utils/classMaps'
import { BaseComponentProps } from '../BaseComponentProps'
import { useStyleProps } from '../../utils/useStyles'
import clsx from 'clsx'
import { IconSize } from '../../icons/Icon'
import iconStyles from '../../icons/Icon.module.css'

export type CheckboxState = 'default' | 'checked' | 'disabled' | 'indeterminate'

export type CheckboxInputProps = {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onClick?: () => void
  size?: IconSize
} & BaseComponentProps

export function Checkbox({
  testId,
  checked,
  indeterminate,
  disabled,
  onClick = () => {},
  size = 'XXS',
  ...otherProps
}: CheckboxInputProps) {
  const ref = useRef(null)
  const styleProps = useStyleProps(otherProps)

  const handleClick = () => {
    // Only call onClick if the checkbox is not disabled
    if (!disabled) {
      onClick()
    }
  }
  const styleClasses = useStyleProps(otherProps)

  return (
    <label
      className={clsx(
        'designsystem-Checkbox',
        styles.checkboxInput,
        disabled ? getClass(styles, 'disabled') : '',
        styleClasses,
        iconStyles['iconSize' + size],
      )}
      data-testid={testId}
      style={styleProps}
    >
      <input
        ref={ref}
        type="checkbox"
        className={getClass(styles, 'hiddenInput')}
        aria-checked={indeterminate ? 'mixed' : checked ? 'true' : 'false'}
        onChange={handleClick}
        checked={checked}
        disabled={disabled}
      />
      <div
        className={clsx(
          iconStyles['iconSize' + size],
          getClass(styles, 'checkboxVisual'),
        )}
      >
        <svg
          className={clsx(
            iconStyles['iconSize' + size],
            getClass(styles, 'checkmark'),
          )}
          viewBox="0 0 18 18"
          aria-hidden="true"
        >
          {indeterminate ? (
            <rect
              x={3}
              y={8}
              width={12}
              height={2}
              rx={1}
              ry={1}
              fill="white"
            />
          ) : checked ? (
            <polyline
              points="1.73 12 7 15 16 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
        </svg>
      </div>
    </label>
  )
}
