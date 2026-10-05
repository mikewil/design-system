import figma from '@figma/code-connect'
import { EncapsulatedIcon, Symbols_Image } from '../src'

const figmaProps = {
  property1: figma.enum('Property 1', {
    '96': '96',
    '56': '56',
    '40': '40',
    '128': '128',
    '64': '64',
    '72': '72',
    '48': '48',
  }),
}

figma.connect(
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=14904-13818&node-type=frame&m=dev',
  {
    props: figmaProps,
    example: () => <EncapsulatedIcon size="S" Icon={Symbols_Image} />,
  },
)
