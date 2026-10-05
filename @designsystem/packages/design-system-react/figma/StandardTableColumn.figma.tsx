import { StandardTable } from '../src'
import figma from '@figma/code-connect'

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
  nestedContent: figma.nestedProps('Table Header', {
    text: figma.textContent('Title'),
  }),
} as const

figma.connect(
  StandardTable.Column,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Header' },
    example: (props) => (
      <StandardTable.Column type="Standard">
        {props.nestedContent.text}
      </StandardTable.Column>
    ),
  },
)

figma.connect(
  StandardTable.Column,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Header / Descending' },
    example: (props) => (
      <StandardTable.Column
        type="Sortable"
        onSortChange={() => alert('sort changed')}
        sortDirection="desc"
      >
        {props.nestedContent.text}
      </StandardTable.Column>
    ),
  },
)

figma.connect(
  StandardTable.Column,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Header / Ascending' },
    example: (props) => (
      <StandardTable.Column
        type="Sortable"
        onSortChange={() => alert('sort changed')}
        sortDirection="asc"
      >
        {props.nestedContent.text}
      </StandardTable.Column>
    ),
  },
)

figma.connect(
  StandardTable.Column,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=11000-17678',
  {
    props: figmaProps,
    variant: { 'Content Style': 'Header / Fixed Blank' },
    example: () => <StandardTable.Column type="Icon" />,
  },
)
