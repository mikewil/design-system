import styles from './RadioGroup.module.css'
import { RadioButton } from './RadioButton/RadioButton'
import { RadioGroup as AriaRadioGroup } from 'react-aria-components'

interface RadioGroupProps {
  label: string
  options: {
    value: string
    label: string
    isDisabled?: boolean
    dataTestId?: string
  }[]
  className?: string
  onChange: (value: string) => void
  selectedValue: string
  testId?: string
}

export function RadioGroup({
  label,
  options,
  className,
  onChange,
  selectedValue,
  testId,
}: RadioGroupProps) {
  return (
    <div className={className}>
      <AriaRadioGroup
        value={selectedValue}
        onChange={onChange}
        aria-label={label}
        className={styles.radioGroup}
        data-testid={testId}
      >
        <label className={styles.labelTitle}>{label}</label>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            value={option.value}
            label={option.label}
            isDisabled={option.isDisabled}
            dataTestId={option.dataTestId}
          />
        ))}
      </AriaRadioGroup>
    </div>
  )
}
