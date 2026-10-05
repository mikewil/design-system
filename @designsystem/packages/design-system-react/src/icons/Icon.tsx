/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import styles from './Icon.module.css'
import { ReactElement } from 'react'
import { BaseComponentProps } from '../components/BaseComponentProps'
import React from 'react'
import clsx from 'clsx'
import { useStyleProps } from '../utils/useStyles'

export type IconSize =
  | 'XXXS'
  | 'XXS'
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'XXXL'

export interface IconProps extends BaseComponentProps {
  /**
   * A screen reader only label for the Icon.
   */
  'aria-label'?: string
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  'aria-hidden'?: boolean | 'false' | 'true'
  /**
   * The content to display. Should be an SVG.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any>
  /**
   * Size of Icon (changes based on scale).
   */
  size?: IconSize

  /**
   * The rotation of the icon in degrees.
   */
  rotation?: number

  /**
   * The data-testid attribute for testing.
   */
  testId?: string
}

export type IconPropsWithoutChildren = Omit<IconProps, 'children'>

/**
 * Spectrum icons are clear, minimal, and consistent across platforms. They follow the focused and rational principles of the design system in both metaphor and style.
 */
export function Icon(props: IconProps) {
  const {
    children,
    size,
    rotation,
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...otherProps
  } = props

  otherProps.flex ??= 'none'

  const styleProps = useStyleProps(otherProps)

  return React.cloneElement(children, {
    'data-testid': props.testId,
    focusable: 'false',
    'aria-label': ariaLabel,
    'aria-hidden': ariaLabel ? ariaHidden || undefined : true,
    role: 'img',
    fill: 'currentColor',
    className: clsx(styles['iconSize' + size], styles['icon']),

    style:
      typeof rotation === 'number'
        ? { transform: `rotate(${rotation}deg)`, ...styleProps }
        : styleProps,
  })
}
