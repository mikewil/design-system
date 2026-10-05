import { FC } from 'react'
import { IconPropsWithoutChildren } from '../../icons/Icon'
import { Navigation_RightCaret } from '../../icons'
import { BaseComponentProps } from '../BaseComponentProps'
import { getClass } from '../../utils/classMaps'
import { Text } from '../Typography/Text'
import styles from './Card.module.css'
import { useStyleProps } from '../../utils/useStyles'

export interface ContentText {
  title: string
  subtitle: string
}

type SolidButtonProps = {
  title?: string
  subtitle?: string
  headerStyle?: 'Title' | 'Subtitle' | 'Custom'
  detailStyle?: 'none' | 'content' | 'image' | 'custom'
  detailContentText?: ContentText[]
  detailImages?: FC<IconPropsWithoutChildren>[]
  isClickThru?: boolean
  isImageVisible?: boolean
  showStatusBar?: boolean
  statusType?: 'Warning' | 'Error' | 'Success' | 'Information' | 'None'
  titleIcon?: FC<IconPropsWithoutChildren>
  customTitle?: JSX.Element
  customContent?: JSX.Element
  onClick?: () => void
} & BaseComponentProps

export function Card({
  testId,
  title = '',
  subtitle = '',
  headerStyle = 'Title',
  detailStyle = 'none',
  isClickThru = false,
  isImageVisible = false,
  showStatusBar = false,
  statusType = 'None',
  detailContentText = [],
  detailImages: images = [],
  titleIcon: ImageContent,
  customTitle: CustomTitle,
  customContent: CustomContent,
  onClick,
  ...otherProps
}: SolidButtonProps) {
  const styleProps = useStyleProps(otherProps)
  const statusClass = statusType
    ? getClass(styles, `cardStatus${statusType}`)
    : ''

  const handleClick = () => {
    if (onClick && isClickThru) {
      onClick()
    }
  }

  return (
    <div
      className={getClass(styles, 'card')}
      data-testid={testId}
      onClick={handleClick}
      style={styleProps}
    >
      <div
        className={`${getClass(styles, 'titleBox')} 
                        ${showStatusBar && getClass(styles, 'cardStatus')} 
                        ${statusClass}`}
        data-testid={showStatusBar && 'status-type-' + statusType}
      >
        {TitleBox(
          title,
          subtitle,
          headerStyle,
          isImageVisible,
          ImageContent,
          CustomTitle,
        )}
        {isClickThru && (
          <Navigation_RightCaret
            size="M"
            color="General/foreground-secondary"
            testId="click-thru-icon"
          />
        )}
      </div>
      {ContentBox(detailStyle, detailContentText, images, CustomContent)}
    </div>
  )
}

function TitleBox(
  title: string,
  subtitle: string,
  headerStyle: string,
  isImageVisible: boolean,
  ImageContent?: FC<IconPropsWithoutChildren>,
  CustomTitle?: JSX.Element,
) {
  if (headerStyle == 'Custom') {
    return <div data-testid="custom-title">{CustomTitle}</div>
  }

  return (
    <>
      {isImageVisible && ImageContent && (
        <ImageContent
          testId="imageContent"
          size={headerStyle === 'Subtitle' ? 'XXL' : 'L'}
          color="General/foreground-secondary"
        />
      )}
      <div className={getClass(styles, 'titleText')}>
        <Text testId="title" variant="header2HighEmphasis">
          {title}
        </Text>
        {headerStyle == 'Subtitle' && (
          <Text testId="subtitle-text" variant="body1LowEmphasis">
            {subtitle}
          </Text>
        )}
      </div>
    </>
  )
}

function ContentBox(
  detailStyle: string,
  contentText?: ContentText[],
  images?: FC<IconPropsWithoutChildren>[],
  CustomContent?: JSX.Element,
) {
  if (detailStyle.toLowerCase() === 'custom') {
    return (
      <div
        data-testid="custom-content"
        className={getClass(styles, 'contentBox')}
      >
        {CustomContent}
      </div>
    )
  } else if (detailStyle.toLowerCase() === 'image') {
    return (
      <div
        data-testid="image-content"
        className={getClass(styles, 'contentBox')}
      >
        {images?.map((Item: FC<IconPropsWithoutChildren>, index) => (
          <Item
            color="General/foreground-secondary"
            key={index}
            testId={'detail-image-' + index}
          />
        ))}
      </div>
    )
  } else if (detailStyle.toLowerCase() === 'content') {
    return (
      <div
        data-testid="content-block"
        className={getClass(styles, 'contentBox')}
      >
        {contentText?.map((item: ContentText, index: number) =>
          HeaderText(index, item.title, item.subtitle),
        )}
      </div>
    )
  }
  return null
}

function HeaderText(index: number, title: string, subtitle: string) {
  return (
    <div
      className={getClass(styles, 'headerText')}
      data-testid={'card-detail-' + index}
      key={index}
    >
      <Text
        testId="header"
        variant="overline2HighEmphasis"
        color="General/foreground-secondary"
      >
        {title}
      </Text>
      <Text testId="subtitle" variant="body1LowEmphasis">
        {subtitle}
      </Text>
    </div>
  )
}
