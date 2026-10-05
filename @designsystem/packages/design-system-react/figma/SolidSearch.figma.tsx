import { SolidSearch } from '../src'
import figma from '@figma/code-connect'

const figmaProps = {
  state: figma.enum('State', {
    'Text Entered': 'text-entered',
    Collapsed: 'collapsed',
    Empty: 'empty',
    Progress: 'progress',
    Entered: 'entered',
  }),
  searchMethod: figma.enum('SearchMethod', {
    Manual: 'manual',
    Predictive: 'predictive',
  }),
}

figma.connect(
  SolidSearch,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=14140-15414&node-type=frame&m=dev',
  {
    props: figmaProps,
    variant: { SearchMethod: 'Manual' },
    example: (props) => (
      <SolidSearch
        searchMode={'onEntered'}
        horizontalAlignment={'leftJustified'}
        onSearch={function (value: string | undefined): void {
          throw new Error('Function not implemented.')
        }}
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        isLoading={false}
      />
    ),
  },
)

figma.connect(
  SolidSearch,
  'https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=14140-15414&node-type=frame&m=dev',
  {
    props: figmaProps,
    variant: { SearchMethod: 'Predictive' },
    example: (props) => (
      <SolidSearch
        searchMode={'onKeyPressed'}
        horizontalAlignment={'leftJustified'}
        onSearch={function (value: string | undefined): void {
          throw new Error('Function not implemented.')
        }}
        onCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
        isLoading={false}
      />
    ),
  },
)
