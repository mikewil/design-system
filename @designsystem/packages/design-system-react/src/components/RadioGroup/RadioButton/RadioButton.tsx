import { getClass } from '../../../utils/classMaps'
import styles from './RadioButton.module.css'
import { Radio } from 'react-aria-components'

interface RadioButtonProps {
  value: string
  label: string
  isDisabled?: boolean
  dataTestId?: string
}

export function RadioButton({
  value,
  label,
  isDisabled,
  dataTestId,
}: RadioButtonProps) {
  return (
    <Radio value={value} isDisabled={isDisabled} data-testid={dataTestId}>
      {({ isSelected, isPressed }) => (
        <label className={styles.radioButton}>
          <input
            type="radio"
            checked={isSelected}
            data-pressed={isPressed && !isSelected}
            onChange={() => {}}
            className={`${styles.radioInput} ${getClass(styles, isSelected ? 'checked' : 'unchecked')} ${getClass(styles, isDisabled ? 'isDisabled' : '')}`}
            value={value}
          />
          <span
            className={`${styles.radioSpan}  ${getClass(styles, isDisabled ? 'isDisabled' : '')}`}
          >
            {label}
          </span>
        </label>
      )}
    </Radio>
  )
}
