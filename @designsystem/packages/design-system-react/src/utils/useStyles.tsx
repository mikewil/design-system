import { useMediaQuery } from 'react-responsive'
import {
  convertSpacingStringToPixels,
  isResponsiveProp,
  type ResponsiveProp,
  type Spacing,
  type StyleProps,
  type BreakPoint,
  colorValues,
  type Colors,
} from './useStyles.types'
import { CSSProperties } from 'react'

/**
 * Converts style props into class names
 *
 * @param props style props
 * @returns An array of strings that can be used as class names
 */
export function useStyleProps<T extends StyleProps>(
  props: T,
): React.CSSProperties {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 959px)' })
  const isMediumScreen = useMediaQuery({ query: '(min-width: 960px)' })
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1280px)' })

  if (props.className) {
    // eslint-disable-next-line no-console
    console.warn(
      'The className prop is unsafe and is unsupported in @designsystem/design-system-react. ' +
        'Please use style props with design system variables. ',
    )
    props.className = ''
  }

  if (props.style) {
    // eslint-disable-next-line no-console
    console.warn(
      'The style prop is unsafe and is unsupported in @designsystem/design-system-react. ' +
        'Please use style props with design system variables. ',
    )
    props.style = {}
  }

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

  const styles: React.CSSProperties = {}
  addMarginStyles(props, styles, matchedBreakpoints)
  addPaddingStyles(props, styles, matchedBreakpoints)
  addColorStyles(props, styles)
  addFlexStyles(props, styles, matchedBreakpoints)

  return styles
}

function addPaddingStyles<T extends StyleProps>(
  {
    padding,
    paddingStart,
    paddingEnd,
    paddingTop,
    paddingBottom,
    paddingX,
    paddingY,
  }: T,
  styles: CSSProperties,
  matchedBreakpoints: BreakPoint[],
) {
  if (padding) {
    styles.padding = getSpacingValue(padding, matchedBreakpoints)
  }

  if (paddingStart) {
    styles.paddingLeft = getSpacingValue(paddingStart, matchedBreakpoints)
  }
  if (paddingEnd) {
    styles.paddingRight = getSpacingValue(paddingEnd, matchedBreakpoints)
  }
  if (paddingTop) {
    styles.paddingTop = getSpacingValue(paddingTop, matchedBreakpoints)
  }
  if (paddingBottom) {
    styles.paddingBottom = getSpacingValue(paddingBottom, matchedBreakpoints)
  }
  if (paddingX) {
    styles.paddingLeft = getSpacingValue(paddingX, matchedBreakpoints)
    styles.paddingRight = getSpacingValue(paddingX, matchedBreakpoints)
  }
  if (paddingY) {
    styles.paddingTop = getSpacingValue(paddingY, matchedBreakpoints)
    styles.paddingBottom = getSpacingValue(paddingY, matchedBreakpoints)
  }
}

function addMarginStyles<T extends StyleProps>(
  {
    margin,
    marginStart,
    marginEnd,
    marginTop,
    marginBottom,
    marginX,
    marginY,
  }: T,
  styles: React.CSSProperties,
  matchedBreakpoints: BreakPoint[],
) {
  if (margin) {
    styles.margin = getSpacingValue(margin, matchedBreakpoints)
  }
  if (marginStart) {
    styles.marginLeft = getSpacingValue(marginStart, matchedBreakpoints)
  }
  if (marginEnd) {
    styles.marginRight = getSpacingValue(marginEnd, matchedBreakpoints)
  }
  if (marginTop) {
    styles.marginTop = getSpacingValue(marginTop, matchedBreakpoints)
  }
  if (marginBottom) {
    styles.marginBottom = getSpacingValue(marginBottom, matchedBreakpoints)
  }
  if (marginX) {
    styles.marginLeft = getSpacingValue(marginX, matchedBreakpoints)
    styles.marginRight = getSpacingValue(marginX, matchedBreakpoints)
  }
  if (marginY) {
    styles.marginTop = getSpacingValue(marginY, matchedBreakpoints)
    styles.marginBottom = getSpacingValue(marginY, matchedBreakpoints)
  }
}

function addColorStyles<T extends StyleProps>(
  { backgroundColor, color, borderColor }: T,
  styles: React.CSSProperties,
) {
  if (backgroundColor) {
    styles.backgroundColor = getColorValue(backgroundColor)
  }
  if (color) {
    styles.color = getColorValue(color)
  }
  if (borderColor) {
    styles.borderColor = getColorValue(borderColor)
  }
}

function addFlexStyles<T extends StyleProps>(
  { flex, flexGrow, flexShrink, flexBasis, justifySelf, alignSelf, order }: T,
  styles: React.CSSProperties,
  matchedBreakpoints: BreakPoint[],
) {
  if (flex !== undefined) {
    const flexValue = getResponsiveValue(flex, matchedBreakpoints)
    if (typeof flexValue === 'boolean') {
      styles.flex = flexValue ? 1 : undefined
    } else {
      styles.flex = flexValue
    }
  }
  if (flexGrow !== undefined) {
    styles.flexGrow = getResponsiveValue(flexGrow, matchedBreakpoints)
  }
  if (flexShrink !== undefined) {
    styles.flexShrink = getResponsiveValue(flexShrink, matchedBreakpoints)
  }
  if (flexBasis !== undefined) {
    styles.flexBasis = getResponsiveValue(flexBasis, matchedBreakpoints)
  }
  if (justifySelf !== undefined) {
    styles.justifySelf = getResponsiveValue(justifySelf, matchedBreakpoints)
  }
  if (alignSelf !== undefined) {
    styles.alignSelf = getResponsiveValue(alignSelf, matchedBreakpoints)
  }
  if (order !== undefined) {
    styles.order = getResponsiveValue(order, matchedBreakpoints)
  }
}

export function getSpacingValue(
  margin: Spacing | ResponsiveProp<Spacing>,
  matchedBreakpoints: BreakPoint[],
): import('csstype').Property.Margin<string | number> | undefined {
  if (isResponsiveProp(margin)) {
    for (const breakpoint of matchedBreakpoints) {
      if (margin[breakpoint]) {
        return convertSpacingStringToPixels(margin[breakpoint])
      }
    }
  } else {
    return convertSpacingStringToPixels(margin)
  }
}

function getColorValue(color: string): string {
  return colorValues[color as Colors] || color
}

export function getResponsiveValue<T>(
  prop: T | ResponsiveProp<T>,
  matchedBreakpoints: BreakPoint[],
): T | undefined {
  if (isResponsiveProp(prop)) {
    for (const breakpoint of matchedBreakpoints) {
      if (prop[breakpoint] !== undefined) {
        return prop[breakpoint]
      }
    }
    return undefined
  } else {
    return prop
  }
}
