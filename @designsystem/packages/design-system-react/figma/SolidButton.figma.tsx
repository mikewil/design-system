import figma from '@figma/code-connect'
import { SolidButton } from '../src'
import { Symbols_Image } from '../src/icons'

const figmaProps = {
  label: figma.textContent('Text'),
  showEndImage: figma.boolean('showEndImage'),
  showStartImage: figma.boolean('showStartImage'),
  state: figma.enum('State', {
    Default: 'default',
    'Hover State': 'hover-state',
    Progress: 'progress',
    Disabled: 'disabled',
  }),
  style: figma.enum('Style', {
    Primary: 'primary',
    Secondary: 'secondary',
  }),
} as const

figma.connect(
  SolidButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25912&m=dev',
  {
    props: figmaProps,
    variant: { showEndImage: false, showStartImage: false },
    example: ({ label, style }) => (
      <SolidButton buttonText={label} variant={style} />
    ),
  },
)

figma.connect(
  SolidButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25912&m=dev',
  {
    props: figmaProps,
    variant: { showEndImage: false, showStartImage: true },
    example: ({ label, style }) => (
      <SolidButton
        buttonText={label}
        variant={style}
        leadingImage={Symbols_Image}
      />
    ),
  },
)

figma.connect(
  SolidButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25912&m=dev',
  {
    props: figmaProps,
    variant: { showEndImage: true, showStartImage: false },
    example: ({ label, style }) => (
      <SolidButton
        buttonText={label}
        variant={style}
        followingImage={Symbols_Image}
      />
    ),
  },
)
