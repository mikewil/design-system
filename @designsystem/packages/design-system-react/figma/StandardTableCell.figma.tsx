import { Products_Compressor, StandardTable } from '../src'
import figma from '@figma/code-connect'
import { IconProps } from '../src/icons/Icon'

const figmaProps = {
  contentStyle: figma.enum('Content Style', {
    Text: 'text',
    'Click-thru': 'click-thru',
    Link: 'link',
    Toggle: 'toggle',
    Checkbox: 'checkbox',
    'Caret / Down': 'caret---down',
    'Caret / Up': 'caret---up',
    Header: 'header',
    'Header / Fixed Blank': 'header---fixed-blank',
    'Header / Descending': 'header---descending',
    'Header / Ascending': 'header---ascending',
    Image: 'image',
    'Image + Text': 'image---text',
    'Image + Subtitle': 'image---subtitle',
    Subtitle: 'subtitle',
    Loading: 'loading',
    Button: 'button',
  }),
  actionLink: figma.textContent('Action Link'),
  textChildren: figma.textContent('List Item'),
} as const

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Text' },
    example: (props) => (
      <StandardTable.Cell style="Text" textValue={props.textChildren} />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Subtitle' },
    example: (props) => (
      <StandardTable.Cell
        style="Subtitle"
        title={props.textChildren}
        subtitle={props.textChildren}
      />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Link' },
    example: (props) => (
      <StandardTable.Cell
        style="Link"
        textValue={props.actionLink}
        linkType="single-spa"
        href="./my-link"
      />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Checkbox' },
    example: () => (
      <StandardTable.Cell
        style="Checkbox"
        checked={false}
        onClick={() => alert('clicked')}
      />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Image' },
    example: () => (
      <StandardTable.Cell style="Icon" icon={Products_Compressor} />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Image + Text' },
    example: (props) => (
      <StandardTable.Cell
        style="Icon + Text"
        icon={Products_Compressor}
        textValue={props.textChildren}
      />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Image + Text' },
    example: (props) => (
      <StandardTable.Cell
        style="Icon + Text"
        icon={Products_Compressor}
        textValue={props.textChildren}
      />
    ),
  },
)

figma.connect(
  StandardTable.Cell,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Image + Text' },
    example: (props) => (
      <StandardTable.Cell
        style="Icon + Subtitle"
        icon={Products_Compressor}
        title={props.textChildren}
        subtitle={props.textChildren}
      />
    ),
  },
)
