import { FC } from 'react'
import { RoundedButton } from '../../../components/Buttons/RoundedButton/RoundedButton'
import { Link } from '../../../components/Link/Link'
import { Text } from '../../../components/Typography/Text'
import { IconPropsWithoutChildren } from '../../../icons/Icon'
import styles from './BlockContents.module.css'
import { BaseComponentProps } from '../../../components/BaseComponentProps'
import { useStyleProps } from '../../../utils/useStyles'

type CommonBlockContentsProps = {
  actionLink?: string
  header: string
  text: string
} & BaseComponentProps

export type BlockContentsWithActionProps =
  | (CommonBlockContentsProps & {
      layout?: 'head' | 'details'
    })
  | (CommonBlockContentsProps & {
      layout?: 'headAction' | 'detailsAction'
      ButtonImage: FC<IconPropsWithoutChildren>
      onButtonClicked?: () => void
      showBadge?: boolean
    })

export const headerTestId = 'designsystem-block-contents-header'
export const textTestId = 'designsystem-block-contents-text'
export const linkTestId = 'designsystem-block-contents-link'
export const editButtonTestId = 'designsystem-block-contents-edit-button'

export function BlockContents({
  actionLink,
  header,
  text,
  testId,
  ...otherProps
}: BlockContentsWithActionProps) {
  const layout = otherProps.layout ?? 'head'
  const style = useStyleProps(otherProps)

  return (
    <div
      className={styles.blockContentsContainerAction}
      data-testid={testId ?? 'designsystem-block-contents'}
      data-layout={otherProps.layout}
      style={style}
    >
      <div className={styles.blockContentsContainer}>
        <Text
          variant="overline2HighEmphasis"
          color="General/foreground-secondary"
          testId={headerTestId}
        >
          {header}
        </Text>
        <Text
          variant={
            layout === 'head' || layout === 'headAction'
              ? 'header3HighEmphasis'
              : 'body1LowEmphasis'
          }
          testId={textTestId}
        >
          {text}
        </Text>
        {actionLink && (
          <Link
            linkType="standard"
            variant="link2LowEmphasis"
            href={actionLink}
            testId={linkTestId}
          >
            Link
          </Link>
        )}
      </div>
      {(otherProps.layout === 'headAction' ||
        otherProps.layout === 'detailsAction') && (
        <div style={{ width: 24, height: 24 }}>
          <RoundedButton
            testId={editButtonTestId}
            ButtonImage={otherProps.ButtonImage}
            layout="image"
            size="S"
            onClick={otherProps.onButtonClicked}
            showBadge={otherProps.showBadge}
          />
        </div>
      )}
    </div>
  )
}
