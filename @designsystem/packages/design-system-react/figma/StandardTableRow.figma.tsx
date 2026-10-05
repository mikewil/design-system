import { StandardTable } from '../src'
import figma from '@figma/code-connect'

const rowProps = {
  isRowStatusBarVisible: figma.boolean('IsRowStatusBarVisible'),
  rowStyle: figma.enum('Row Style', {
    Default: 'default',
    'Accordion / Expanded': 'accordion---expanded',
    'Alternating Row': 'alternating-row',
    Selected: 'selected',
    'Click-Thru': 'click-thru',
    'Accordion / Collapsed': 'accordion---collapsed',
    Loading: 'loading',
    'Show More': 'show-more',
  }),
  children: figma.children('Table Cell'),
} as const

figma.connect(
  StandardTable.Row,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10909%3A22102',
  {
    props: rowProps,
    example: (props) => <StandardTable.Row>{props.children}</StandardTable.Row>,
  },
)

figma.connect(
  StandardTable.Row,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10909%3A22102',
  {
    props: rowProps,
    variant: { 'Row Style': 'Selected' },
    example: (props) => (
      <StandardTable.Row onSelect={() => alert('selected')} isSelected={true}>
        {props.children}
      </StandardTable.Row>
    ),
  },
)

figma.connect(
  StandardTable.Row,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10909%3A22102',
  {
    props: rowProps,
    variant: { 'Row Style': 'Click-Thru' },
    example: (props) => (
      <StandardTable.Row onClick={() => alert('clicked')}>
        {props.children}
      </StandardTable.Row>
    ),
  },
)

figma.connect(
  StandardTable.Row,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10909%3A22102',
  {
    props: rowProps,
    variant: { IsRowStatusBarVisible: true },
    example: (props) => (
      <StandardTable.Row status="Information">
        {props.children}
      </StandardTable.Row>
    ),
  },
)

figma.connect(
  StandardTable.Row,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10909%3A22102',
  {
    props: rowProps,
    variant: { IsRowStatusBarVisible: true },
    example: (props) => (
      <StandardTable.Row status="Information">
        {props.children}
      </StandardTable.Row>
    ),
  },
)
