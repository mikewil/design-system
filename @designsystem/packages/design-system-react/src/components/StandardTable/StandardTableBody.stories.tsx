import type { Meta, StoryObj } from '@storybook/react'
import StandardTable from './StandardTable'
import { useEffect, useState } from 'react'
import { userEvent, within, expect } from '@storybook/test'
import { StandardTableTester } from '@designsystem/design-system-react-testing'

const meta: Meta<typeof StandardTable.Body> = {
  component: StandardTable.Body,
}

export default meta
type Story = StoryObj<typeof StandardTable.Body>

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ children, ...args }) => {
    const rows = Array.from({ length: 5 }, (_, index) => (
      <StandardTable.Row key={index}>
        <StandardTable.Cell style="Text" textValue={`Item ${index + 1}`} />
        <StandardTable.Cell style="Text" textValue="Content" />
        <StandardTable.Cell style="Text" textValue="Content" />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Title</StandardTable.Column>
          <StandardTable.Column>Title</StandardTable.Column>
          <StandardTable.Column>Title</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body {...args}>{rows}</StandardTable.Body>
      </StandardTable>
    )
  },
}

export const InfiniteScroll: Story = {
  render: () => {
    const [data, setData] = useState<{ id: number; name: string }[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const loadMore = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newItems = Array.from({ length: 10 }, (_, index) => ({
        id: (page - 1) * 10 + index,
        name: `Item ${(page - 1) * 10 + index + 1}`,
      }))

      setData((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)
      setHasMore(page < 5) // Stop after 5 pages
      setIsLoading(false)
    }

    useEffect(() => {
      loadMore()
    }, [])

    const rows = data.map((item) => (
      <StandardTable.Row key={item.id}>
        <StandardTable.Cell style="Text" textValue={item.name} />
      </StandardTable.Row>
    ))

    return (
      <StandardTable testId="table">
        <StandardTable.Header>
          <StandardTable.Column>Name</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
        >
          {rows}
        </StandardTable.Body>
      </StandardTable>
    )
  },
  play: async ({ canvasElement, step }) => {
    const table = within(canvasElement).getByTestId('table')
    await within(canvasElement).findAllByRole('row')
    const tableTester = new StandardTableTester(userEvent.setup(), table)

    await step('Wait for table to load data', async () => {
      await tableTester.waitForLoadingToFinish()
    })

    await step('Get rows', async () => {
      const rows = await tableTester.getRows()
      expect(rows).toHaveLength(11)
    })
  },
}

export const InfiniteScrollManual: Story = {
  render: () => {
    const [data, setData] = useState<{ id: number; name: string }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const loadMore = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newItems = Array.from({ length: 10 }, (_, index) => ({
        id: (page - 1) * 10 + index,
        name: `Item ${(page - 1) * 10 + index + 1}`,
      }))

      setData((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)
      setHasMore(page < 5) // Stop after 5 pages
      setIsLoading(false)
    }

    useEffect(() => {
      loadMore()
    }, [])

    const rows = data.map((item) => (
      <StandardTable.Row key={item.id}>
        <StandardTable.Cell style="Text" textValue={item.name} />
      </StandardTable.Row>
    ))

    return (
      <StandardTable>
        <StandardTable.Header>
          <StandardTable.Column>Name</StandardTable.Column>
        </StandardTable.Header>
        <StandardTable.Body
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          loadMoreMode="manual"
        >
          {rows}
        </StandardTable.Body>
      </StandardTable>
    )
  },
}
