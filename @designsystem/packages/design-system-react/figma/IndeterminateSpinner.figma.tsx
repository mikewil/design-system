import figma from '@figma/code-connect'
import { IndeterminateSpinner } from '../src'

figma.connect(
  IndeterminateSpinner,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10135-14925&m=dev',
  {
    props: {
      variant: figma.enum('Variant', {
        Black: 'black',
        White: 'white',
        Color: 'color',
      }),
      step: figma.enum('Step', {
        One: 'one',
        Two: 'two',
        Three: 'three',
        Four: 'four',
        Five: 'five',
        Six: 'six',
        Seven: 'seven',
        Eight: 'eight',
      }),
    },
    example: (props) => (
      <IndeterminateSpinner variant={props.variant} size="small" />
    ),
  },
)
