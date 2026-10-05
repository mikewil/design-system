import clsx from 'clsx'
import { getClass } from '../../utils/classMaps'
import styles from './InlineNotification.module.css'
import { Text } from '../Typography/Text'
import {
  Symbols_Information,
  Notifications_Bell,
  Symbols_Check,
  Notifications_SafetyAlertColor_Custom,
  Navigation_Close,
} from '../../icons'
import { Link } from '../Link/Link'
import { ResponsiveRow } from '../../layout/ResponsiveRow/ResponsiveRow'

type InlineNotificationProps = {
  /**
   * The test ID used for the component
   */
  testId: string

  /**
   * The bolded far left text
   */
  title?: string

  /**
   * The text to display in the notification
   */
  text?: string

  /**
   * The text to display in the action link
   */
  actionLinkText?: string

  /**
   * The URL to navigate to when the action link is clicked
   */
  actionLinkHref?: string

  /**
   * Whether to show the title
   */
  showTitle?: boolean
  /**
   * Whether to show the text
   */
  showText?: boolean

  /**
   * Whether to show the action link
   */
  showActionLink?: boolean

  /**
   * Whether to show the dismiss icon
   */
  dismissIcon?: boolean

  /**
   * The function to call when the close icon is clicked
   */
  closeClick(): void

  /**
   * The level of the notification
   */
  level:
    | 'information'
    | 'success'
    | 'low-priority'
    | 'high-priority'
    | 'safety-notice'
    | 'safety-caution'
    | 'safety-warning'
    | 'safety-danger'
}

export function InlineNotification({
  testId,
  title,
  text,
  actionLinkText,
  actionLinkHref,
  showTitle,
  showText,
  showActionLink,
  dismissIcon,
  closeClick = () => {},
  level,
}: InlineNotificationProps) {
  const showLeftHeader = level.includes('safety')
  return (
    <ResponsiveRow>
      <div
        data-testid={testId}
        data-level={level}
        className={clsx(getClass(styles, 'container'))}
      >
        {showLeftHeader && (
          <div
            data-testid="leftHeader"
            className={clsx(
              getClass(styles, 'leftHeader'),
              getClass(styles, `leftHeader${level.replace(/-/g, '')}`),
            )}
          >
            {showTitle && (
              <>
                {getIcon(level)}
                <Text testId="title" variant="body3HighEmphasis">
                  {title}
                </Text>
              </>
            )}
          </div>
        )}
        <div
          className={clsx(
            getClass(styles, 'inlineNotification'),
            getClass(styles, `inlineNotification${level.replace(/-/g, '')}`),
          )}
        >
          <div className={clsx(styles.leftItems)}>
            {!showLeftHeader && showTitle && (
              <>
                {getIcon(level)}
                <Text testId="title" variant="body3HighEmphasis">
                  {title}
                </Text>
              </>
            )}
            {showText && (
              <Text testId="text" variant="body3LowEmphasis">
                {text}
              </Text>
            )}
            {showActionLink && (
              <Link
                linkType="standard"
                variant="link3LowEmphasis"
                href={actionLinkHref ?? ''}
                target="_blank"
                testId="actionLink"
              >
                {actionLinkText}
              </Link>
            )}
          </div>
          <ResponsiveRow.Split />
          {dismissIcon && (
            <div
              data-testid="closeIcon"
              className={clsx(getClass(styles, 'dismissIcon'))}
              onClick={() => closeClick() ?? undefined}
            >
              <Navigation_Close
                size="XXS"
                color="General/foreground-secondary"
              />
            </div>
          )}
        </div>
      </div>
    </ResponsiveRow>
  )
}

export function getLevelClass(level: InlineNotificationProps['level']): string {
  const className = level.replace(/-/g, '')
  return styles[className] || ''
}

export function getIcon(level: InlineNotificationProps['level']) {
  console.log(level)
  const iconMap: Record<
    InlineNotificationProps['level'],
    JSX.Element | undefined
  > = {
    information: (
      <Symbols_Information color="Notifications/notification-information" />
    ),
    success: <Symbols_Check color="Notifications/notification-success" />,
    'low-priority': (
      <Notifications_Bell color="Notifications/notification-lowpriority" />
    ),
    'high-priority': (
      <Notifications_Bell color="Notifications/notification-highpriority" />
    ),
    'safety-notice': undefined,
    'safety-caution': <Notifications_SafetyAlertColor_Custom />,
    'safety-warning': <Notifications_SafetyAlertColor_Custom />,
    'safety-danger': <Notifications_SafetyAlertColor_Custom />,
  }

  return iconMap[level] // Default icon
}
