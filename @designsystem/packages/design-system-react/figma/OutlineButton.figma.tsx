import React, { FC } from 'react'
import { OutlineButton } from '../src'
import figma from '@figma/code-connect'
import { IconPropsWithoutChildren } from '../src/icons/Icon'

const figmaProps = {
  label: figma.textContent('Text'),
  showEndImage: figma.boolean('showEndImage'),
  showStartImage: figma.boolean('showStartImage'),
  buttonImage: figma.instance('buttonImage'),
  state: figma.enum('State', {
    Default: 'default',
    'Hover State': 'hover-state',
    Progress: 'progress',
    Disabled: 'disabled',
    'Selection Closed': 'selection-closed',
    'Selection Open': 'selection-open',
    Focused: 'focused',
  }),
}

figma.connect(
  OutlineButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25910&node-type=frame&m=dev',
  {
    props: figmaProps,
    variant: { showEndImage: false, showStartImage: false },
    example: ({ label }) => (
      <OutlineButton buttonText={label} variant="default" />
    ),
  },
)

figma.connect(
  OutlineButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25910&node-type=frame&m=dev',
  {
    props: figmaProps,
    variant: { showEndImage: true, showStartImage: false },
    example: ({ label }) => (
      <OutlineButton buttonText={label} variant="selection" />
    ),
  },
)
