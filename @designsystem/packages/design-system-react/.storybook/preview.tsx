// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import type { Preview } from '@storybook/react'
import { InputType } from 'storybook/internal/types'

function getSpacingArgType(subCategory: string): InputType {
  return {
    table: { category: 'Styling', subcategory: subCategory },
    control: 'select',
    options: [
      'spacing-0',
      'spacing-1',
      'spacing-2',
      'spacing-3',
      'spacing-4',
      'spacing-5',
      'spacing-6',
      'spacing-7',
      'spacing-8',
      'spacing-9',
      'spacing-10',
      'spacing-11',
      'spacing-12',
      'spacing-13',
      'spacing-14',
      'spacing-15',
    ],
  }
}

function getColorArgType(): InputType {
  return {
    table: { category: 'Styling', subcategory: 'Color' },
    control: 'select',
    options: [
      'General/foreground-primary',
      'General/foreground-secondary',
      'General/foreground-light',
      'General/foreground-dark',
      'General/outline-primary',
      'General/outline-secondary',
      'General/divider',
      'General/divider-shadow-supplement',
      'General/alternatingrow-surface',
      'Surfaces/surface-background',
      'Surfaces/surface-level1',
      'Surfaces/surface-level2',
      'Surfaces/surface-level3',
      'Surfaces/surface-level4',
      'Surfaces/surface-level1-alt',
      'Surfaces/surface-level2-alt',
      'Surfaces/surface-level3-alt',
      'Surfaces/surface-level4-alt',
      'Actions/action-primary',
      'Actions/action-secondary-level2',
      'Actions/action-tertiary1',
      'Actions/action-tertiary2',
      'Actions/action-tertiary3',
      'Actions/action-tertiary4',
      'Actions/action-primary-overlay',
      'Actions/action-secondary-overlay',
      'Actions/action-tertiary-overlay',
      'Navigation/navigation-background',
      'Navigation/navigation-primary',
      'Navigation/navigation-secondary',
      'Navigation/navigation-tertiary',
      'Navigation/navigation-surface-hover',
      'Navigation/navigation-surface-select',
      'Notifications/notification-highpriority',
      'Notifications/notification-highpriority-tint',
      'Notifications/notification-lowpriority',
      'Notifications/notification-lowprioritytint',
      'Notifications/notification-information',
      'Notifications/notification-information-tint',
      'Notifications/notification-success',
      'Notifications/notification-success-tint',
      'Safety/safety-danger',
      'Safety/safety-tint',
      'Safety/safety-warning',
      'Safety/safety-warning-tint',
      'Safety/safety-notice',
      'Safety/safety-notice-tint',
      'Illustrations/illustration-stroke',
      'Illustrations/illustration-fill-primary',
      'Illustrations/illustration-fill-secondary',
      'Illustrations/illustration-fill-tertiary',
      'Illustrations/illustration-accent',
    ],
  }
}

const preview: Preview = {
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    margin: getSpacingArgType('Margin'),
    marginStart: getSpacingArgType('Margin'),
    marginEnd: getSpacingArgType('Margin'),
    marginTop: getSpacingArgType('Margin'),
    marginBottom: getSpacingArgType('Margin'),
    marginX: getSpacingArgType('Margin'),
    marginY: getSpacingArgType('Margin'),
    padding: getSpacingArgType('Padding'),
    paddingStart: getSpacingArgType('Padding'),
    paddingEnd: getSpacingArgType('Padding'),
    paddingTop: getSpacingArgType('Padding'),
    paddingBottom: getSpacingArgType('Padding'),
    paddingX: getSpacingArgType('Padding'),
    paddingY: getSpacingArgType('Padding'),
    color: getColorArgType(),
    backgroundColor: getColorArgType(),
    borderColor: getColorArgType(),
    flex: { table: { category: 'Styling', subcategory: 'Flex' } },
    flexGrow: { table: { category: 'Styling', subcategory: 'Flex' } },
    flexShrink: { table: { category: 'Styling', subcategory: 'Flex' } },
    flexBasis: { table: { category: 'Styling', subcategory: 'Flex' } },
    justifySelf: { table: { category: 'Styling', subcategory: 'Flex' } },
    alignSelf: { table: { category: 'Styling', subcategory: 'Flex' } },
    order: { table: { category: 'Styling', subcategory: 'Flex' } },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [{ name: 'Background', value: '#F8F8F8' }],
      default: 'Background',
    },
    docs: {
      toc: {
        headingSelector: 'h2, h3',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <span id="preview-decorator">{Story()}</span>],
}

export default preview
