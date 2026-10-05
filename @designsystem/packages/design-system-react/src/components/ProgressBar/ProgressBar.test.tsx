import { ProgressBar, getTextColor, mapBarProgressToValue } from './ProgressBar'
import { render } from '@testing-library/react'
import { ProgressBarTester } from '@designsystem/design-system-react-testing'

describe('Chip', () => {
  const testId = 'designsystem-progress-bar'

  it('should render the progress bar normally', () => {
    const progressBarText = 'Example Label'
    const progressBarProgress = 42
    const progressType = 'success'

    const { getByTestId } = render(
      <ProgressBar
        testId={testId}
        state={progressType}
        progressText={progressBarText}
        unitText={`(${progressBarProgress}%)`}
        barProgress={progressBarProgress}
        showUnits={true}
        aria-label={'example-label'}
      ></ProgressBar>,
    )

    const progressBarElement = new ProgressBarTester(getByTestId(testId))

    expect(progressBarElement.title).toEqual(progressBarText + ' (42%)')
    expect(progressBarElement.progress).toEqual('42')
    expect(progressBarElement.type).toEqual(progressType)
  })

  it('should render with complete progress and warning color ', () => {
    const progressBarText = 'Example Label'
    const progressBarProgress = 50
    const progressType = 'error'
    const { getByTestId } = render(
      <ProgressBar
        testId={testId}
        state={progressType}
        progressText={progressBarText}
        barProgress={progressBarProgress}
        showUnits={false}
        aria-label={'example-label'}
      ></ProgressBar>,
    )

    const progressBarElement = new ProgressBarTester(getByTestId(testId))

    expect(progressBarElement.title).toEqual('Example Label ')
    expect(progressBarElement.progress).toEqual('50')
    expect(progressBarElement.type).toEqual(progressType)
  })

  it('should render empty bar', () => {
    const progressType = 'information'

    const { getByTestId } = render(
      <ProgressBar
        testId={testId}
        state={progressType}
        barProgress={20}
        progressText="Example Label"
        aria-label={'example-label'}
      ></ProgressBar>,
    )

    const progressBarElement = new ProgressBarTester(getByTestId(testId))

    expect(progressBarElement.title).toEqual('Example Label ')
    expect(progressBarElement.progress).toEqual('20')
    expect(progressBarElement.type).toEqual(progressType)
  })

  it('should render error bar', () => {
    const progressType = 'error'

    const { getByTestId } = render(
      <ProgressBar
        testId={testId}
        state={progressType}
        barProgress={36}
        progressText="Example Label"
        aria-label={'example-label'}
      ></ProgressBar>,
    )

    const progressBarElement = new ProgressBarTester(getByTestId(testId))

    expect(progressBarElement.title).toEqual('Example Label ')
    expect(progressBarElement.progress).toEqual('36')
    expect(progressBarElement.type).toEqual(progressType)
  })
})

describe('mapBarProgressToValue', () => {
  it('should return the barProgress value when it is a number between 0 and 100', () => {
    expect(mapBarProgressToValue(50)).toBe(50)
  })

  it('should return 0 when barProgress is less than 0', () => {
    expect(mapBarProgressToValue(-10)).toBe(0)
  })

  it('should return 100 when barProgress is greater than 100', () => {
    expect(mapBarProgressToValue(150)).toBe(100)
  })

  it('should return 0 when barProgress is 0', () => {
    expect(mapBarProgressToValue(0)).toBe(0)
  })

  it('should return 99 when barProgress is 99', () => {
    expect(mapBarProgressToValue(99)).toBe(99)
  })
})

describe('getTextColor', () => {
  it('should return "General/foreground-secondary" when state is "empty"', () => {
    expect(getTextColor('empty')).toBe('General/foreground-secondary')
  })

  it('should return "Notifications/notification-highpriority" when state is "error"', () => {
    expect(getTextColor('error')).toBe(
      'Notifications/notification-highpriority',
    )
  })

  it('should return "Notifications/notification-success" when state is "success"', () => {
    expect(getTextColor('success')).toBe('Notifications/notification-success')
  })

  it('should return "Notifications/notification-information" when state is "information"', () => {
    expect(getTextColor('information')).toBe(
      'Notifications/notification-information',
    )
  })

  it('should return "General/foreground-secondary" when state is undefined', () => {
    expect(getTextColor()).toBe('General/foreground-secondary')
  })
})
