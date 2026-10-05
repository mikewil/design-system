import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'
import { useState } from 'react'

const meta: Meta<typeof StandardTable.Row> = {
  component: StandardTable.Row,
}

export default meta
type Story = StoryObj<typeof StandardTable.Row>

export const Default: Story = {
  render: () => {
    const rows = Array.from({ length: 3 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell style="Text" textValue={`Row ${index + 1}`} />
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

export const RowClick: Story = {
  render: () => {
    const handleRowClick = (id: number) => {
      alert(`Row ${id} clicked`)
    }

    const rows = Array.from({ length: 5 }, (_, rowIndex) => (
      <StandardTable.Row
        key={rowIndex}
        onClick={() => handleRowClick(rowIndex + 1)}
      >
        <StandardTable.Cell style="Text" textValue={`Item ${rowIndex + 1}`} />
        <StandardTable.Cell style="Text" textValue={`Item ${rowIndex + 1}`} />
        <StandardTable.Cell style="Text" textValue={`Item ${rowIndex + 1}`} />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Name</StandardTable.Column>
          <StandardTable.Column>Name</StandardTable.Column>
          <StandardTable.Column>Name</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const StatusRows: Story = {
  render: () => {
    const rows = [
      <StandardTable.Row key="0" status="None">
        <StandardTable.Cell style="Text" textValue="None Row" />
        {/* ...additional cells... */}
      </StandardTable.Row>,
      <StandardTable.Row key="1" status="Information">
        <StandardTable.Cell style="Text" textValue="Information Row" />
        {/* ...additional cells... */}
      </StandardTable.Row>,
      <StandardTable.Row key="2" status="Warning">
        <StandardTable.Cell style="Text" textValue="Warning Row" />
        {/* ...additional cells... */}
      </StandardTable.Row>,
      <StandardTable.Row key="3" status="Error">
        <StandardTable.Cell style="Text" textValue="Error Row" />
        {/* ...additional cells... */}
      </StandardTable.Row>,
      <StandardTable.Row key="4" status="Success">
        <StandardTable.Cell style="Text" textValue="Success Row" />
        {/* ...additional cells... */}
      </StandardTable.Row>,
    ]

    return (
      <StandardTable testId="table">
        <StandardTable.Header>
          <StandardTable.Column>Name</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const SelectableRows: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const handleSelect = (id: number) => {
      setSelectedIds((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((sid) => sid !== id)
          : [...prevSelected, id],
      )
    }

    const rows = Array.from({ length: 5 }, (_, index) => {
      const id = index + 1
      return (
        <StandardTable.Row
          key={id}
          onSelect={() => handleSelect(id)}
          isSelected={selectedIds.includes(id)}
        >
          <StandardTable.Cell style="Text" textValue={`Item ${id}`} />
          {/* ...additional cells... */}
        </StandardTable.Row>
      )
    })

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Name</StandardTable.Column>
          {/* ...additional columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}
