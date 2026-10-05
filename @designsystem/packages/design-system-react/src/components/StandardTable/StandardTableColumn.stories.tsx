import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'
import { useState } from 'react'
import { Products_Compressor } from '../../icons'
import { userEvent, within } from '@storybook/test'
import { StandardTableTester } from '@designsystem/design-system-react-testing'

const meta: Meta<typeof StandardTable.Column> = {
  component: StandardTable.Column,
}

export default meta
type Story = StoryObj<typeof StandardTable.Column>

export const Default: Story = {
  render: () => {
    const columns = ['Name', 'Age', 'Address']

    const rows = Array.from({ length: 5 }, (_, rowIndex) => (
      <StandardTable.Row key={rowIndex}>
        {columns.map((col, colIndex) => (
          <StandardTable.Cell
            key={colIndex}
            style="Text"
            textValue={`Data ${rowIndex + 1}-${colIndex + 1}`}
          />
        ))}
      </StandardTable.Row>
    ))

    return (
      <StandardTable testId="table">
        <StandardTable.Header>
          {columns.map((title, index) => (
            <StandardTable.Column key={index}>{title}</StandardTable.Column>
          ))}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const Sortable: Story = {
  render: () => {
    const [sortDirection, setSortDirection] = useState<
      'asc' | 'desc' | undefined
    >()

    const handleSortChange = () => {
      setSortDirection((prev) =>
        prev === 'asc' ? 'desc' : prev === 'desc' ? undefined : 'asc',
      )
    }

    const rows = Array.from({ length: 5 }, (_, rowIndex) => (
      <StandardTable.Row key={rowIndex}>
        <StandardTable.Cell style="Text" textValue={`Item ${rowIndex + 1}`} />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column
            onSortChange={handleSortChange}
            sortDirection={sortDirection}
          >
            Name
          </StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
  play: async ({ canvasElement, step }) => {
    const table = within(canvasElement).getByRole('table')
    const tableTester = new StandardTableTester(userEvent.setup(), table)

    await step('Trigger a sort', async () => {
      await tableTester.triggerSort('Name')
    })

    await step('Trigger a sort again', async () => {
      await tableTester.triggerSort('Name')
    })
  },
}

export const IconColumns: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell style="Icon" icon={Products_Compressor} />
        <StandardTable.Cell style="Text" textValue="Content" />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column type="Icon" />
          <StandardTable.Column>Title</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}
