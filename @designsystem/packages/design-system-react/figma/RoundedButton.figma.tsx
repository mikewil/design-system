import { RoundedButton } from '../src/components/Buttons/RoundedButton/RoundedButton'
import figma from '@figma/code-connect'

figma.connect(
  RoundedButton,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-26036',
  {
    props: {
      buttonImage: figma.instance('buttonImage'),
      showBadge: figma.boolean('showBadge'),
      state: figma.enum('State', {
        Default: 'default',
        Disabled: 'disabled',
        Hover: 'hover',
        Progress: 'progress',
      }),
      layout: figma.enum('Layout', {
        Image: 'image',
        Text: 'text',
        TextImage: 'textimage',
      }),
    },
    example: (props) => (
      <RoundedButton
        testId="example-test-id"
        state={props.state}
        layout={props.layout}
        showBadge={props.showBadge}
        buttonImage={props.buttonImage}
        buttonText="Button"
        onClick={() => {
          alert('Button clicked')
        }}
      />
    ),
  },
)
