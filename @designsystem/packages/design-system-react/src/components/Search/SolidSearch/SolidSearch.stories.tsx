import { Meta, StoryObj } from '@storybook/react/'
import { SolidSearch } from './SolidSearch'
import { useState } from 'react'

const meta: Meta<typeof SolidSearch> = {
  component: SolidSearch,
}

export default meta
type Story = StoryObj<typeof SolidSearch>

const SolidSearchTemplate: Story = {
  render: ({ ...args }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string | undefined>()
    const handleSearch = (value: string | undefined) => {
      if (!isLoading) {
        setIsLoading(true)
      }
      setTimeout(() => setIsLoading(false), 1000)
      setSearchTerm(value)
    }
    const handleCancel = () => {
      setSearchTerm(undefined)
    }
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:
            args.horizontalAlignment === 'leftJustified'
              ? 'row'
              : 'row-reverse',
          width: '400px',
          minWidth: '400px',
          height: '60px',
          border: '1px solid',
          padding: '8px',
        }}
      >
        <div>
          <SolidSearch
            {...args}
            onSearch={handleSearch}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
        <div style={{ width: '20px' }}></div>
        <div style={{ alignContent: 'center' }}>
          Current Search: {searchTerm}
        </div>
      </div>
    )
  },
}

export const SearchOnKeyPressed = {
  ...SolidSearchTemplate,
  args: {
    searchMode: 'onKeyPressed',
    horizontalAlignment: 'leftJustified',
  },
  argTypes: {
    searchMode: {
      control: false,
    },
  },
}

export const SearchOnEnterKeyPressed = {
  ...SolidSearchTemplate,
  args: {
    searchMode: 'onEntered',
    horizontalAlignment: 'leftJustified',
  },
  argTypes: {
    searchMode: {
      control: false,
    },
  },
}
