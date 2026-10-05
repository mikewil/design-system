import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'

const meta: Meta<typeof StandardTable.Header> = {
  component: StandardTable.Header,
}

export default meta
type Story = StoryObj<typeof StandardTable.Header>

export const Default: Story = {
  render: () => {
    const rows = Array.from({ length: 3 }, (_, rowIndex) => (
      <StandardTable.Row key={rowIndex}>
        <StandardTable.Cell style="Text" textValue={`Row ${rowIndex + 1}`} />
        <StandardTable.Cell style="Text" textValue="Content" />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Column 1</StandardTable.Column>
          <StandardTable.Column>Column 2</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}
