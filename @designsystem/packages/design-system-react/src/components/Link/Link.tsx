import React from 'react'
import { Text } from '../Typography/Text'
import { BaseComponentProps } from '../BaseComponentProps'
// ...existing imports...

/**
 * The type of the Link component.
 * - `'standard'`: Renders as an anchor tag with `href` and `target`.
 * - `'click'`: Renders as a button and requires an `onClick` handler.
 * - `'single-spa'`: Renders as an anchor tag but handles navigation internally.
 */
export type LinkType = 'standard' | 'click' | 'single-spa'

/** Common props shared by all link types */
type CommonProps = {
  /**
   * The variant of the link text
   * @default 'link1LowEmphasis'
   */
  variant?: 'link1LowEmphasis' | 'link2LowEmphasis' | 'link3LowEmphasis'
  /** The content of the link */
  children: React.ReactNode
  /** The type of the link */
  linkType: LinkType
} & Omit<BaseComponentProps, 'style' | 'variant'>

/** Props for standard link */
export interface StandardLinkProps extends CommonProps {
  linkType: 'standard'
  /** The URL to navigate to */
  href: string
  /** The target window for the link */
  target?: string
}

/** Props for click link */
export interface ClickLinkProps extends CommonProps {
  linkType: 'click'
  /** Click handler for the button */
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

/** Props for single-spa link */
export interface SingleSpaLinkProps extends CommonProps {
  linkType: 'single-spa'
  /** The URL to navigate to */
  href: string
}

/** Discriminated union of LinkProps */
export type LinkProps = StandardLinkProps | ClickLinkProps | SingleSpaLinkProps

/**
 * The Link component wraps the Text component and provides different link behaviors.
 */
export const Link: React.FC<LinkProps> = (props) => {
  const {
    linkType = 'standard',
    variant = 'link1LowEmphasis',
    children,
    testId,
    ...rest
  } = props

  const textProps = {
    variant,
    ...rest,
  }

  textProps.color ??= 'Actions/action-tertiary1'

  switch (linkType) {
    case 'click':
      const { onClick } = props as ClickLinkProps
      return (
        <button
          data-testid={testId}
          onClick={onClick}
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          <Text {...textProps}>{children}</Text>
        </button>
      )

    case 'standard':
      const { target, href: standardHref } = props as StandardLinkProps
      return (
        <a href={standardHref} target={target} data-testid={testId}>
          <Text {...textProps}>{children}</Text>
        </a>
      )
    case 'single-spa':
      const { href: singleSpaHref } = props as SingleSpaLinkProps
      const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        window.history.pushState(null, '', singleSpaHref)
      }
      return (
        <a href={singleSpaHref} onClick={handleClick} data-testid={testId}>
          <Text {...textProps}>{children}</Text>
        </a>
      )
    default:
      return null
  }
}
