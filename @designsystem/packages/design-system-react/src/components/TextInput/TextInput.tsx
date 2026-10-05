import {
  TextField,
  Label,
  Input,
  FieldError,
  Text,
  TextFieldProps,
  ValidationResult,
} from 'react-aria-components'
import '../../theme.css'
import styles from './TextInput.module.css'
import { Text as DesignSystemText } from '../Typography/Text'
import { BaseComponentProps } from '../BaseComponentProps'
import { useStyleProps } from '../../utils/useStyles'

export type DesignSystemTextFieldProps = {
  testId?: string
  label?: string
  subLabel?: string
  description?: string
  placeholder?: string
  value?: string
  isRequired?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  errorMessage?: string | ((validation: ValidationResult) => string)
  onChange?: (e: string) => void
} & BaseComponentProps &
  TextFieldProps

export function TextInput({
  testId,
  label,
  subLabel,
  description,
  placeholder,
  value,
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  errorMessage,
  onChange,
  ...props
}: DesignSystemTextFieldProps) {
  const styleProps = useStyleProps(props)
  return (
    <TextField
      type="text"
      data-testid={testId}
      isRequired={isRequired}
      isInvalid={!!isInvalid}
      isDisabled={!!isDisabled}
      value={value}
      onChange={onChange}
      className={'designsystem-TextInput'}
      aria-label={label || subLabel || 'Text Input'}
      {...props}
      style={styleProps}
    >
      {label && (
        <DesignSystemText variant="overline2MediumEmphasis" inline={isRequired}>
          <Label
            data-testid="designsystem-text-input-label"
            className={styles.label}
          >
            {label}
          </Label>
        </DesignSystemText>
      )}
      {isRequired && (
        <DesignSystemText variant="overline2MediumEmphasis" inline>
          <span
            data-testid="designsystem-text-input-asterisk"
            className={styles.asterisk}
          >
            *
          </span>
        </DesignSystemText>
      )}
      {subLabel && (
        <DesignSystemText variant="captionLowEmphasis">
          <Text
            data-testid="designsystem-text-input-sub-label"
            className={styles.subLabel}
            slot="description"
          >
            {subLabel}
          </Text>
        </DesignSystemText>
      )}
      <Input
        data-testid="designsystem-text-input"
        className={styles.input}
        placeholder={placeholder}
      />
      {description && !(isInvalid && errorMessage) && (
        <DesignSystemText variant="captionLowEmphasis">
          <Text
            data-testid="designsystem-text-input-description"
            className={styles.description}
            slot="description"
          >
            {description}
          </Text>
        </DesignSystemText>
      )}
      {errorMessage && isInvalid && (
        <DesignSystemText variant="captionLowEmphasis">
          <FieldError
            data-testid="designsystem-text-input-error-message"
            className={styles.fieldError}
          >
            {errorMessage}
          </FieldError>
        </DesignSystemText>
      )}
    </TextField>
  )
}
