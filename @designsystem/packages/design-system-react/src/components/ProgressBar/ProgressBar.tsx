import { Meter, MeterProps } from 'react-aria-components'
import { getClass } from '../../utils/classMaps'
import styles from './ProgressBar.module.css'
import { Text } from '../Typography/Text'

interface MyMeterProps extends Omit<MeterProps, 'value'> {
  testId?: string
  barProgress: number
  progressText?: string
  unitText?: string
  showText?: boolean
  showUnits?: boolean
  state?: 'empty' | 'error' | 'success' | 'information'
}

export function ProgressBar({
  testId,
  barProgress,
  progressText = 'Progress',
  unitText,
  showText = true,
  showUnits = true,
  state,
}: MyMeterProps) {
  const statusClass = getStatusClass(styles, state)
  const textColor = getTextColor(state)
  const value = mapBarProgressToValue(barProgress, state)

  return (
    <Meter
      data-testid={testId}
      data-percentage={value}
      data-bar-type={state}
      value={value}
      aria-label={'progress-bar-' + progressText}
    >
      {({}) => (
        <>
          <div data-testid={'progress-bar'} className={getClass(styles, 'bar')}>
            <div
              data-testid="progress-bar-fill"
              className={`${getClass(styles, 'barFill')} ${getClass(styles, statusClass)} `}
              style={{ width: value + '%' }}
            />
          </div>
          <Text
            testId="progress-bar-label"
            variant="body3LowEmphasis"
            color={textColor}
          >
            {textForValue(showText, showUnits, progressText, unitText)}
          </Text>
        </>
      )}
    </Meter>
  )
}

export function textForValue(
  showText?: boolean,
  showUnits?: boolean,
  progressText?: string,
  unitText?: string,
): string {
  const text = showText && progressText ? progressText + ' ' : ''
  const units = showUnits && unitText ? unitText : ''
  return text + units
}

export function getTextColor(
  state?: 'empty' | 'error' | 'success' | 'information',
) {
  if (state === 'empty') return 'General/foreground-secondary'
  if (state === 'error') return 'Notifications/notification-highpriority'
  else if (state === 'success') return 'Notifications/notification-success'
  else if (state === 'information')
    return 'Notifications/notification-information'
  else return 'General/foreground-secondary'
}

export function mapBarProgressToValue(
  barProgress: number,
  state?: 'empty' | 'error' | 'success' | 'information',
): number {
  if (state === 'empty' || barProgress <= 0) return 0
  if (barProgress >= 100) return 100
  return barProgress
}

function getStatusClass(
  styles: { [x: string]: string },
  state?: 'empty' | 'error' | 'success' | 'information',
): string {
  if (state !== 'empty') return getClass(styles, `barFill${state}`)
  else return ''
}
