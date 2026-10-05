import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './ProgressBar'

// Needed for every component
const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
}
export default meta
type Story = StoryObj<typeof ProgressBar>

// You MUST define a test id for C# tests to work
const testId = 'designsystem-progress-bar'

// For each different variant you want to display in storybook
export const Primary: Story = {
  render: (args) => {
    return (
      <div style={{ width: '250px' }}>
        <ProgressBar {...args} />
      </div>
    )
  },
  args: {
    testId: testId,
    barProgress: 50,
    progressText: 'Progress Text',
    unitText: '(units)',
    state: 'information',
    showUnits: true,
    showText: true,
  },
}

export const Error: Story = {
  render: (args) => {
    return (
      <div style={{ width: '250px' }}>
        <ProgressBar {...args} />
      </div>
    )
  },
  args: {
    testId: testId,
    barProgress: 36,
    progressText: 'Progress Text',
    unitText: '(36%)',
    state: 'error',
    showUnits: true,
    showText: false,
  },
}

export const Complete: Story = {
  render: (args) => {
    return (
      <div style={{ width: '250px' }}>
        <ProgressBar {...args} />
      </div>
    )
  },
  args: {
    testId: testId,
    barProgress: 89,
    progressText: 'Progress Text',
    unitText: '(units)',
    state: 'success',
    showUnits: false,
    showText: true,
  },
}

export const Empty: Story = {
  render: (args) => {
    return (
      <div style={{ width: '250px' }}>
        <ProgressBar {...args} />
      </div>
    )
  },
  args: {
    testId: testId,
    barProgress: 89,
    progressText: 'Progress Text',
    unitText: '(units)',
    state: 'empty',
    showUnits: false,
    showText: false,
  },
}
