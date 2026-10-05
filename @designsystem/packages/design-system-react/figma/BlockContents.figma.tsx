import { Actions_Edit, BlockContents } from '../src'
import figma from '@figma/code-connect'

const figmaProps = {
  showAction: figma.boolean('showAction'),
  showLink: figma.boolean('showLink'),
  style: figma.enum('Style', {
    Head: 'head',
    Details: 'details',
  }),
}

figma.connect(
  BlockContents,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10718-16572&node-type=frame&m=dev',
  {
    props: figmaProps,
    example: (props) => (
      <BlockContents
        layout="headAction"
        header="Header"
        text="Text"
        ButtonImage={Actions_Edit}
        onButtonClicked={function (): void {
          throw new Error('Function not implemented.')
        }}
        showBadge
      />
    ),
  },
)
