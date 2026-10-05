import figma from '@figma/code-connect'
import { TextInput } from '../lib/components/TextInput/TextInput'

const figmaProps = {
  clearAction: figma.boolean('clearAction'),
  showHeader: figma.boolean('showHeader'),
  requiredField: figma.boolean('requiredField'),
  showAssistiveText: figma.boolean('showAssistiveText'),
  showSubHeader: figma.boolean('showSubHeader'),
  state: figma.enum('State', {
    Empty: 'empty',
    Entered: 'entered',
    Locked: 'locked',
  }),
  errorState: figma.boolean('ErrorState'),
}

figma.connect(
  TextInput,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25969&m=dev',
  {
    props: figmaProps,
    variant: {
      State: 'Empty',
    },
    example: (props) => (
      <TextInput
        testId="example-test-id"
        label="Title"
        subLabel="Subtitle"
        description="Assistive Text"
        placeholder="Example Text"
        errorMessage="This field is required"
        isRequired={props.requiredField}
        isInvalid={props.errorState}
        onChange={() => {}}
      />
    ),
  },
)

figma.connect(
  TextInput,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25969&m=dev',
  {
    props: figmaProps,
    variant: {
      State: 'Entered',
    },
    example: (props) => (
      <TextInput
        testId="example-test-id"
        label="Title"
        subLabel="Subtitle"
        description="Assistive Text"
        placeholder="Example Text"
        value="Example Text"
        errorMessage="This field is required"
        isRequired={props.requiredField}
        isInvalid={props.errorState}
        onChange={() => {}}
      />
    ),
  },
)

figma.connect(
  TextInput,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25969&m=dev',
  {
    props: figmaProps,
    variant: {
      State: 'Locked',
    },
    example: (props) => (
      <TextInput
        testId="example-test-id"
        label="Title"
        subLabel="Subtitle"
        description="Assistive Text"
        placeholder="Example Text"
        value="Example Text"
        errorMessage="This field is required"
        isDisabled
        isRequired={props.requiredField}
        isInvalid={props.errorState}
        onChange={() => {}}
      />
    ),
  },
)
