import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'
import { Products_Compressor } from '../../icons'
import { useState } from 'react'
import { userEvent, within, expect } from '@storybook/test'
import { StandardTableTester } from '@designsystem/design-system-react-testing'

const meta: Meta<typeof StandardTable.Cell> = {
  component: StandardTable.Cell,
}

export default meta
type Story = StoryObj<typeof StandardTable.Cell>

export const TextCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell style="Text" textValue="Content" />
        {/* ...additional cells if needed... */}
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const SubtitleCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Subtitle"
          title={`Title ${index + 1}`}
          subtitle={`Subtitle ${index + 1}`}
        />
        {/* ...additional cells if needed... */}
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const LinkCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Link"
          linkType="single-spa"
          href={`/item/${index + 1}`}
          textValue="Link"
        />
        {/* ...additional cells if needed... */}
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const CheckboxCells: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const handleSelect = (id: number) => {
      console.log('selected', id)
      setSelectedIds((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((sid) => sid !== id)
          : [...prevSelected, id],
      )
    }

    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Checkbox"
          onClick={() => handleSelect(index + 1)}
          checked={selectedIds.includes(index + 1)}
        />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const IconCells: Story = {
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
  play: async ({ canvasElement, step }) => {
    const table = within(canvasElement).getByRole('table')
    await within(canvasElement).findAllByRole('row')
    const tableTester = new StandardTableTester(userEvent.setup(), table)

    await step('Wait for table to load data', async () => {
      await tableTester.waitForLoadingToFinish()
    })

    await step('Get rows', async () => {
      const rows = await tableTester.getRows()
      expect(rows).toHaveLength(5)
    })

    await step('Get text content of first cell', async () => {
      const rows = await tableTester.getRows()
      const firstCell = rows[0].getCell('Title')
      expect(firstCell).toHaveTextContent('Content')
    })
  },
}

export const IconTextCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Icon + Text"
          textValue="Content"
          icon={Products_Compressor}
        />
        {/* ...additional cells if needed... */}
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const IconLinkCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Icon + Link"
          textValue="Content"
          icon={Products_Compressor}
          iconProps={{ color: 'General/foreground-secondary' }}
          linkProps={{
            linkType: 'click',
            onClick: () => alert('Link clicked'),
          }}
        />
        {/* ...additional cells if needed... */}
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {/* ...existing columns... */}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const IconSubtitleCells: Story = {
  render: () => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell
          style="Icon + Subtitle"
          title="Title"
          subtitle="Subtitle"
          icon={Products_Compressor}
        />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}
