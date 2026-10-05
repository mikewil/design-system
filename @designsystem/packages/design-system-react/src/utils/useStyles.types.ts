import type { CSSProperties } from 'react'
export const stylingPropNames = [
  'margin',
  'marginStart',
  'marginEnd',
  'marginTop',
  'marginBottom',
  'marginX',
  'marginY',
  'padding',
  'paddingStart',
  'paddingEnd',
  'paddingTop',
  'paddingBottom',
  'paddingX',
  'paddingY',
  'backgroundColor',
  'color',
  'borderColor',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'justifySelf',
  'alignSelf',
  'order',
] as const
export type Spacing =
  | 'spacing-0'
  | 'spacing-1'
  | 'spacing-2'
  | 'spacing-3'
  | 'spacing-4'
  | 'spacing-5'
  | 'spacing-6'
  | 'spacing-7'
  | 'spacing-8'
  | 'spacing-9'
  | 'spacing-10'
  | 'spacing-11'
  | 'spacing-12'
  | 'spacing-13'
  | 'spacing-14'
  | 'spacing-15'

export type Colors =
  | 'General/foreground-primary'
  | 'General/foreground-secondary'
  | 'General/foreground-light'
  | 'General/foreground-dark'
  | 'General/outline-primary'
  | 'General/outline-secondary'
  | 'General/divider'
  | 'General/divider-shadow-supplement'
  | 'General/alternatingrow-surface'
  | 'Surfaces/surface-background'
  | 'Surfaces/surface-level1'
  | 'Surfaces/surface-level2'
  | 'Surfaces/surface-level3'
  | 'Surfaces/surface-level4'
  | 'Surfaces/surface-level1-alt'
  | 'Surfaces/surface-level2-alt'
  | 'Surfaces/surface-level3-alt'
  | 'Surfaces/surface-level4-alt'
  | 'Actions/action-primary'
  | 'Actions/action-secondary-level2'
  | 'Actions/action-tertiary1'
  | 'Actions/action-tertiary2'
  | 'Actions/action-tertiary3'
  | 'Actions/action-tertiary4'
  | 'Actions/action-primary-overlay'
  | 'Actions/action-secondary-overlay'
  | 'Actions/action-tertiary-overlay'
  | 'Navigation/navigation-background'
  | 'Navigation/navigation-primary'
  | 'Navigation/navigation-secondary'
  | 'Navigation/navigation-tertiary'
  | 'Navigation/navigation-surface-hover'
  | 'Navigation/navigation-surface-select'
  | 'Notifications/notification-highpriority'
  | 'Notifications/notification-highpriority-tint'
  | 'Notifications/notification-lowpriority'
  | 'Notifications/notification-lowprioritytint'
  | 'Notifications/notification-information'
  | 'Notifications/notification-information-tint'
  | 'Notifications/notification-success'
  | 'Notifications/notification-success-tint'
  | 'Safety/safety-danger'
  | 'Safety/safety-tint'
  | 'Safety/safety-warning'
  | 'Safety/safety-warning-tint'
  | 'Safety/safety-notice'
  | 'Safety/safety-notice-tint'
  | 'Illustrations/illustration-stroke'
  | 'Illustrations/illustration-fill-primary'
  | 'Illustrations/illustration-fill-secondary'
  | 'Illustrations/illustration-fill-tertiary'
  | 'Illustrations/illustration-accent'

export type BreakPoint = 'S' | 'M' | 'L' | 'base'

export type ResponsiveProp<T> = {
  [index in BreakPoint]?: T
}

export type Responsive<T> = T | ResponsiveProp<T>

type MarginProps = {
  /**
   * The margin for all four sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin).
   * @example
   * // Use the spacing-1 spacing value
   * <Box margin="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box margin={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  margin?: Responsive<Spacing>

  /**
   * The margin for the logical start side of the element, depending on layout direction. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginStart="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginStart={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginStart?: Responsive<Spacing>

  /**
   * The margin for the logical end side of an element, depending on layout direction. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginEnd="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginEnd={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginEnd?: Responsive<Spacing>

  /**
   * The margin for the top side of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginTop="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginTop={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginTop?: Responsive<Spacing>

  /**
   * The margin for the bottom side of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginBottom="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginBottom={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginBottom?: Responsive<Spacing>

  /**
   * The margin for both the left and right sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginX="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginX={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginX?: Responsive<Spacing>

  /**
   * The margin for both the top and bottom sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/margin).
   * @example
   * // Use the spacing-1 spacing value
   * <Box marginY="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box marginY={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  marginY?: Responsive<Spacing>
}

export type PaddingProps = {
  /**
   * The padding for all four sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding).
   * @example
   * // Use the spacing-1 spacing value
   * <Box padding="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box padding={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  padding?: Responsive<Spacing>

  /**
   * The padding for the logical start side of the element, depending on layout direction. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingStart="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingStart={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingStart?: Responsive<Spacing>

  /**
   * The padding for the logical end side of an element, depending on layout direction. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingEnd="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingEnd={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingEnd?: Responsive<Spacing>

  /**
   * The padding for the top side of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingTop="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingTop={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingTop?: Responsive<Spacing>

  /**
   * The padding for the bottom side of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingBottom="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingBottom={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingBottom?: Responsive<Spacing>

  /**
   * The padding for both the left and right sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingX="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingX={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingX?: Responsive<Spacing>

  /**
   * The padding for both the top and bottom sides of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding).
   * @example
   * // Use the spacing-1 spacing value
   * <Box paddingY="spacing-1" />
   * @example
   * // Use different spacing values for different breakpoints
   * <Box paddingY={{ S: 'spacing-1', M: 'spacing-2', L: 'spacing-3' }} />
   */
  paddingY?: Responsive<Spacing>
}

type ColorProps = {
  /**
   * The background color of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color).
   * @example
   * // Use the 'blue' color value
   * <Box backgroundColor="blue" />
   */
  backgroundColor?: Colors

  /**
   * The color of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color).
   * @example
   * // Use the 'blue' color value
   * <Box color="blue" />
   */
  color?: Colors

  /**
   * The border color of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-color).
   * @example
   * // Use the 'blue' color value
   * <Box borderColor="blue" />
   */
  borderColor?: Colors
}

type FlexProps = {
  /** When used in a flex layout, specifies how the element will grow or shrink to fit the space available. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex). */
  flex?: Responsive<CSSProperties['flex']>
  /** When used in a flex layout, specifies how the element will grow to fit the space available. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow). */
  flexGrow?: Responsive<CSSProperties['flexGrow']>
  /** When used in a flex layout, specifies how the element will shrink to fit the space available. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink). */
  flexShrink?: Responsive<CSSProperties['flexShrink']>
  /** When used in a flex layout, specifies the initial main size of the element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis). */
  flexBasis?: Responsive<CSSProperties['flexBasis']>
  /** Specifies how the element is justified inside a flex or grid container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self). */
  justifySelf?: Responsive<CSSProperties['justifySelf']> // ...
  /** Overrides the `alignItems` property of a flex or grid container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self). */
  alignSelf?: Responsive<CSSProperties['alignSelf']>
  /** The layout order for the element within a flex or grid container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/order). */
  order?: Responsive<CSSProperties['order']>
}

export type StyleProps = {
  /**
   * @deprecated The className prop is unsafe and is unsupported in @designsystem/design-system-react. Please use style props with design system variables.
   */
  className?: string

  /**
   * @deprecated The style prop is unsafe and is unsupported in @designsystem/design-system-react. Please use style props with design system variables.
   */
  style?: React.CSSProperties
} & MarginProps &
  PaddingProps &
  ColorProps &
  FlexProps

export function isResponsiveProp<T>(
  prop: Responsive<T>,
): prop is ResponsiveProp<T> {
  return typeof prop === 'object'
}

const spacingValues: { [index in Spacing]: string } = {
  'spacing-0': '2px',
  'spacing-1': '4px',
  'spacing-2': '8px',
  'spacing-3': '12px',
  'spacing-4': '16px',
  'spacing-5': '20px',
  'spacing-6': '24px',
  'spacing-7': '32px',
  'spacing-8': '40px',
  'spacing-9': '48px',
  'spacing-10': '56px',
  'spacing-11': '64px',
  'spacing-12': '72px',
  'spacing-13': '80px',
  'spacing-14': '88px',
  'spacing-15': '96px',
}

export const colorValues: { [index in Colors]: string } = {
  'General/foreground-primary': '#3d3d3d',
  'General/foreground-secondary': '#a3a3a3',
  'General/foreground-light': '#ffffff',
  'General/foreground-dark': '#3d3d3d',
  'General/outline-primary': '#a3a3a3',
  'General/outline-secondary': '#e7e7e7',
  'General/divider': '#e7e7e7',
  'General/divider-shadow-supplement': '#ffffff',
  'General/alternatingrow-surface': '#e7e7e7',
  'Surfaces/surface-background': '#f8f8f8',
  'Surfaces/surface-level1': '#ffffff',
  'Surfaces/surface-level2': '#ffffff',
  'Surfaces/surface-level3': '#ffffff',
  'Surfaces/surface-level4': '#ffffff',
  'Surfaces/surface-level1-alt': '#e7e7e7',
  'Surfaces/surface-level2-alt': '#e7e7e7',
  'Surfaces/surface-level3-alt': '#e7e7e7',
  'Surfaces/surface-level4-alt': '#e7e7e7',
  'Actions/action-primary': '#175788',
  'Actions/action-secondary-level2': '#c1cdd8',
  'Actions/action-tertiary1': '#30a8df',
  'Actions/action-tertiary2': '#30a8df',
  'Actions/action-tertiary3': '#30a8df',
  'Actions/action-tertiary4': '#5dc0e7',
  'Actions/action-primary-overlay': '#000000',
  'Actions/action-secondary-overlay': '#175788',
  'Actions/action-tertiary-overlay': '#c1cdd8',
  'Navigation/navigation-background': '#093762',
  'Navigation/navigation-primary': '#c1cdd8',
  'Navigation/navigation-secondary': '#efefef',
  'Navigation/navigation-tertiary': '#093762',
  'Navigation/navigation-surface-hover': '#ffffff',
  'Navigation/navigation-surface-select': '#175788',
  'Notifications/notification-highpriority': '#ff0b1e',
  'Notifications/notification-highpriority-tint': '#ffe5e7',
  'Notifications/notification-lowpriority': '#ffba00',
  'Notifications/notification-lowprioritytint': '#fff0c8',
  'Notifications/notification-information': '#2da1d6',
  'Notifications/notification-information-tint': '#caefff',
  'Notifications/notification-success': '#78be21',
  'Notifications/notification-success-tint': '#e4f2d2',
  'Safety/safety-danger': '#bd2024',
  'Safety/safety-tint': '#ffe5e7',
  'Safety/safety-warning': '#ff7900',
  'Safety/safety-warning-tint': '#ffe4cc',
  'Safety/safety-notice': '#004488',
  'Safety/safety-notice-tint': '#e6ecf3',
  'Illustrations/illustration-stroke': '#303336',
  'Illustrations/illustration-fill-primary': '#f8f8f8',
  'Illustrations/illustration-fill-secondary': '#efefef',
  'Illustrations/illustration-fill-tertiary': '#303336',
  'Illustrations/illustration-accent': '#5dc0e7',
}

export function convertSpacingStringToPixels(spacing: Spacing): string {
  return spacingValues[spacing]
}
