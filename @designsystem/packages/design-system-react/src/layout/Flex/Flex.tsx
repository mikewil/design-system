import { ForwardedRef, forwardRef, ReactNode } from 'react'
import type { CSSProperties } from 'react'
import {
  getResponsiveValue,
  getSpacingValue,
  useStyleProps,
} from '../../utils/useStyles'
import { BreakPoint, Responsive, Spacing } from '../../utils/useStyles.types'
import { useMediaQuery } from 'react-responsive'
import { BaseComponentProps } from '../../components/BaseComponentProps'

export type FlexProps = {
  /**
   * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
   * @default 'stretch'
   */
  justifyContent?: Responsive<CSSProperties['justifyContent']>
  /**
   * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
   * @default 'start'
   */
  alignContent?: Responsive<CSSProperties['alignContent']>
  /**
   * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
   * @default 'stretch'
   */
  alignItems?: Responsive<CSSProperties['alignItems']>
  /** The space to display between both rows and columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap). */
  gap?: Responsive<Spacing>
  /** The space to display between columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap). */
  columnGap?: Responsive<Spacing>
  /** The space to display between rows. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap). */
  rowGap?: Responsive<Spacing>

  /**
   * The direction in which to layout children. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
   * @default 'row'
   */
  direction?: Responsive<CSSProperties['flexDirection']>

  /**
   * Whether to wrap items onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
   * @default false
   */
  wrap?: Responsive<CSSProperties['flexWrap'] | boolean>

  /**
   * Children of the flex container
   */
  children: ReactNode
} & BaseComponentProps

/**
 * A flex box for building advanced one-off layouts
 * @deprecated This should only be used for one-off layouts. For consistent and fast spacing, use on of the pre-built layouts like `ResponsiveRow` or build a new one.
 */
function Flex(props: FlexProps, ref: ForwardedRef<HTMLDivElement>) {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 959px)' })
  const isMediumScreen = useMediaQuery({ query: '(min-width: 960px)' })
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1280px)' })

  const matchedBreakpoints: BreakPoint[] = []

  if (isLargeScreen) {
    matchedBreakpoints.push('L')
  }
  if (isMediumScreen) {
    matchedBreakpoints.push('M')
  }
  if (isSmallScreen) {
    matchedBreakpoints.push('S')
  }

  const { children, ...otherProps } = props
  const styleProps = useStyleProps(otherProps)

  styleProps.display = 'flex'

  if (otherProps.justifyContent) {
    styleProps.justifyContent = getResponsiveValue(
      otherProps.justifyContent,
      matchedBreakpoints,
    )
  }

  if (otherProps.alignItems) {
    styleProps.alignItems = getResponsiveValue(
      otherProps.alignItems,
      matchedBreakpoints,
    )
  }

  if (otherProps.alignContent) {
    styleProps.alignContent = getResponsiveValue(
      otherProps.alignContent,
      matchedBreakpoints,
    )
  }

  if (otherProps.wrap) {
    const wrapValue = getResponsiveValue(otherProps.wrap, matchedBreakpoints)
    if (typeof wrapValue === 'boolean') {
      styleProps.flexWrap = wrapValue ? 'wrap' : 'nowrap'
    } else {
      styleProps.flexWrap = wrapValue
    }
  } else {
    styleProps.flexWrap = 'wrap'
  }

  if (otherProps.direction) {
    styleProps.flexDirection = getResponsiveValue(
      otherProps.direction,
      matchedBreakpoints,
    )
  }

  if (otherProps.gap != null) {
    styleProps.gap = getSpacingValue(otherProps.gap, matchedBreakpoints)
  }

  if (otherProps.columnGap != null) {
    styleProps.columnGap = getSpacingValue(
      otherProps.columnGap,
      matchedBreakpoints,
    )
  }

  if (otherProps.rowGap != null) {
    styleProps.rowGap = getSpacingValue(otherProps.rowGap, matchedBreakpoints)
  }

  return (
    <div data-testid={props.testId} style={styleProps} ref={ref}>
      {children}
    </div>
  )
}

/**
 * A layout container using flexbox. Provides Spectrum dimension values, and supports the gap
 * property to define consistent spacing between items.
 */
const _Flex = forwardRef(Flex)
export { _Flex as Flex }
