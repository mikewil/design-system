import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'
import {
  Connections_Cloud,
  Connections_CloudDisconnected,
  Notifications_Bell,
  Symbols_Dot,
  Symbols_Pending,
} from '../../icons'

const meta: Meta<typeof StandardTable> = {
  component: StandardTable,
}

export default meta
type Story = StoryObj<typeof StandardTable>

export const Default: Story = {
  render: () => {
    const rows = Array.from({ length: 15 }, (_, rowIndex) => (
      <StandardTable.Row key={rowIndex}>
        {Array.from({ length: 7 }, (_, cellIndex) => (
          <StandardTable.Cell
            key={cellIndex}
            style="Text"
            textValue="Content"
          />
        ))}
      </StandardTable.Row>
    ))

    return (
      <StandardTable testId="table">
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {Array.from({ length: 6 }, (_, index) => (
            <StandardTable.Column key={index}>Title</StandardTable.Column>
          ))}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const AlternatingRows: Story = {
  render: () => {
    const rows = Array.from({ length: 15 }, (_, rowIndex) => (
      <StandardTable.Row key={rowIndex}>
        {Array.from({ length: 7 }, (_, cellIndex) => (
          <StandardTable.Cell
            key={cellIndex}
            style="Text"
            textValue="Content"
          />
        ))}
      </StandardTable.Row>
    ))

    return (
      <StandardTable variant="Alternating Rows">
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          {Array.from({ length: 6 }, (_, index) => (
            <StandardTable.Column key={index}>Title</StandardTable.Column>
          ))}
        </StandardTable.Header>
        <StandardTable.Body>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const RealWorldExample: Story = {
  render: () => {
    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column type="Icon" />
          <StandardTable.Column>Product</StandardTable.Column>
          <StandardTable.Column>Status</StandardTable.Column>
          <StandardTable.Column>Location</StandardTable.Column>
          <StandardTable.Column>Position</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body>
          <StandardTable.Row
            status="Warning"
            onClick={() => alert('You clicked me!')}
          >
            <StandardTable.Cell
              style="Icon"
              icon={Notifications_Bell}
              color="Notifications/notification-lowpriority"
            />
            <StandardTable.Cell
              style="Subtitle"
              title="BT Tiger Op"
              subtitle="559833409,850295003,390998311"
            />
            <StandardTable.Cell
              style="Icon + Text"
              icon={Connections_Cloud}
              color="General/foreground-secondary"
              textValue="Connected"
            />
            <StandardTable.Cell style="Text" textValue="Beach Town Dental" />
            <StandardTable.Cell
              style="Text"
              textValue="Main Floor, Operatory 1"
            />
          </StandardTable.Row>

          <StandardTable.Row
            status="None"
            onClick={() => alert('You clicked me!')}
          >
            <StandardTable.Cell style="Icon" icon={null} />
            <StandardTable.Cell
              style="Subtitle"
              title="BT Cougar Op"
              subtitle="8902563590"
            />
            <StandardTable.Cell
              style="Icon + Link"
              icon={Symbols_Pending}
              textValue="Connectable"
              iconProps={{ color: 'General/foreground-secondary' }}
              linkProps={{
                linkType: 'click',
                onClick: () => alert('Link clicked'),
              }}
            />
            <StandardTable.Cell style="Text" textValue="Beach Town Dental" />
            <StandardTable.Cell
              style="Text"
              textValue="Main Floor, Operatory 2"
            />
          </StandardTable.Row>

          <StandardTable.Row
            status="None"
            onClick={() => alert('You clicked me!')}
          >
            <StandardTable.Cell style="Icon" icon={null} />
            <StandardTable.Cell
              style="Subtitle"
              title="DV Operatory 1"
              subtitle="4401267235"
            />
            <StandardTable.Cell
              style="Icon + Text"
              color="General/foreground-secondary"
              icon={Symbols_Dot}
              textValue="Standalone"
            />
            <StandardTable.Cell style="Text" textValue="Dental Visions" />
            <StandardTable.Cell
              style="Text"
              textValue="Main Floor, Operatory 1"
            />
          </StandardTable.Row>

          <StandardTable.Row
            status="Warning"
            onClick={() => alert('You clicked me!')}
          >
            <StandardTable.Cell
              style="Icon"
              icon={Notifications_Bell}
              color="Notifications/notification-lowpriority"
            />
            <StandardTable.Cell
              style="Subtitle"
              title="DV Operatory 2 - West"
              subtitle="5590190456"
            />
            <StandardTable.Cell
              style="Icon + Text"
              color="General/foreground-secondary"
              icon={Connections_CloudDisconnected}
              textValue="Disconnected"
            />
            <StandardTable.Cell style="Text" textValue="Dental Visions" />
            <StandardTable.Cell
              style="Text"
              textValue="Main Floor, Operatory 2"
            />
          </StandardTable.Row>

          <StandardTable.Row
            status="None"
            onClick={() => alert('You clicked me!')}
          >
            <StandardTable.Cell style="Icon" icon={null} />
            <StandardTable.Cell
              style="Subtitle"
              title="DV Operatory 2 - East"
              subtitle="4562454267"
            />
            <StandardTable.Cell
              style="Icon + Text"
              color="General/foreground-secondary"
              icon={Symbols_Dot}
              textValue="Standalone"
            />
            <StandardTable.Cell style="Text" textValue="Dental Visions" />
            <StandardTable.Cell
              style="Text"
              textValue="Main Floor, Operatory 2"
            />
          </StandardTable.Row>
        </StandardTable.Body>
      </StandardTable>
    )
  },
}
