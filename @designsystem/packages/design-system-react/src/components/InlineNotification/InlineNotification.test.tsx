import { userEvent } from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { InlineNotificationTester } from '@designsystem/design-system-react-testing'
import { getLevelClass, InlineNotification } from './InlineNotification'
import styles from './InlineNotification.module.css'

describe('Inline Notification', () => {
  it('should render the information inline notification', async () => {
    const testId = 'designsystem-inline-notification' // Test ID is critical for writing unit tests
    const user = userEvent.setup()
    const handleCloseClick = jest.fn()

    // Render the component normally
    const { getByTestId } = render(
      <InlineNotification
        testId={testId}
        showTitle={true}
        title={'title'}
        showText={true}
        text={'text'}
        showActionLink={true}
        actionLinkText={'action link text'}
        actionLinkHref={'www.mydesignsystem.com'}
        level={'information'}
        dismissIcon={true}
        closeClick={handleCloseClick}
      ></InlineNotification>,
    )

    // Get the Element from Tester Class
    const inlineNotificationElement = new InlineNotificationTester(
      getByTestId(testId),
      user,
    )

    // All comparisons come from the Tester Class
    expect(inlineNotificationElement.title).toEqual('title')
    expect(inlineNotificationElement.text).toEqual('text')
    expect(inlineNotificationElement.actionLinkText).toEqual('action link text')
    expect(inlineNotificationElement.notificationLevel).toEqual('information')
    expect(inlineNotificationElement.hasLeftHeader).toBe(false)
    await inlineNotificationElement.clickCloseIcon()
    expect(handleCloseClick).toHaveBeenCalled()
  })

  it('should render the Safety inline notification', () => {
    const testId = 'designsystem-inline-notification' // Test ID is critical for writing unit tests
    const user = userEvent.setup()

    // Render the component normally
    const { getByTestId } = render(
      <InlineNotification
        testId={testId}
        showTitle={true}
        title={'WARNING'}
        showText={true}
        text={'text'}
        showActionLink={true}
        actionLinkText={'action link text'}
        actionLinkHref={'www.mydesignsystem.com'}
        level={'safety-warning'}
        closeClick={() => {}}
      ></InlineNotification>,
    )

    // Get the Element from Tester Class
    const inlineNotificationElement = new InlineNotificationTester(
      getByTestId(testId),
      user,
    )

    // All comparisons come from the Tester Class
    expect(inlineNotificationElement.title).toEqual('WARNING')
    expect(inlineNotificationElement.text).toEqual('text')
    expect(inlineNotificationElement.actionLinkText).toEqual('action link text')
    expect(inlineNotificationElement.notificationLevel).toEqual(
      'safety-warning',
    )
    expect(inlineNotificationElement.hasLeftHeader).toBe(true)
  })
})

describe('getLevelClass', () => {
  it('should return the correct class for "Information" level', () => {
    const level = 'information'
    const expectedClass = styles['information']
    expect(getLevelClass(level, 'variant')).toBe(expectedClass)
  })

  it('should return the correct class for "Safety Danger" level', () => {
    const level = 'safety-danger'
    const expectedClass = styles['safetydanger']
    expect(getLevelClass(level, 'variant')).toBe(expectedClass)
  })
})
