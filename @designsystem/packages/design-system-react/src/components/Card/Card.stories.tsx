import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import {
  Products_Sterilizer,
  Products_Compressor,
  Products_DentalOperatoryAssistant,
  Products_DentalVacuumBase,
  Products_DentalVacuum,
} from '../../icons'

const meta: Meta<typeof Card> = {
  component: Card,
}
const dataTestId = 'designsystem-card'

const iconArray = [
  Products_Sterilizer,
  Products_Compressor,
  Products_Sterilizer,
  Products_DentalOperatoryAssistant,
  Products_DentalVacuumBase,
  Products_DentalVacuum,
]
const textArray = [
  { title: 'Title', subtitle: 'Subtitle' },
  { title: 'Title', subtitle: 'Subtitle' },
]
const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum`

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  render: (args) => {
    return (
      <div style={{ width: 500 }}>
        <Card {...args}></Card>
      </div>
    )
  },

  args: {
    testId: dataTestId,
    isImageVisible: true,
    titleIcon: Products_Sterilizer,
    title: 'Title',
    subtitle: 'Subtitle',
    showStatusBar: true,
    statusType: 'Success',
    headerStyle: 'Subtitle',
    detailStyle: 'content',
    isClickThru: true,
    detailImages: iconArray,
    detailContentText: textArray,
    onClick: () => {
      alert('Button clicked')
    },
    customTitle: <div>{loremIpsum}</div>,
    customContent: <div>{loremIpsum}</div>,
  },
}

export const Images: Story = {
  render: (args) => {
    return (
      <div style={{ width: 500 }}>
        <Card {...args}></Card>
      </div>
    )
  },
  args: {
    testId: dataTestId,
    headerStyle: 'Subtitle',
    detailStyle: 'image',
    detailImages: iconArray,
    title: 'Title',
    subtitle: 'Subtitle',
  },
}

export const SubTitle: Story = {
  render: (args) => {
    return (
      <div style={{ width: 500 }}>
        <Card {...args}></Card>
      </div>
    )
  },
  args: {
    testId: dataTestId,
    isImageVisible: true,
    titleIcon: Products_Sterilizer,
    headerStyle: 'Subtitle',
    title: 'Title',
    subtitle: 'Subtitle',
  },
}

export const CustomContent: Story = {
  render: (args) => {
    return (
      <div style={{ width: 500 }}>
        <Card {...args}></Card>
      </div>
    )
  },
  args: {
    testId: dataTestId,
    detailStyle: 'custom',
    headerStyle: 'Custom',
    customTitle: <div>{loremIpsum}</div>,
    customContent: <div>{loremIpsum}</div>,
  },
}

export const NoArguments: Story = {
  render: (args) => {
    return (
      <div style={{ width: 500 }}>
        <Card {...args}></Card>
      </div>
    )
  },
  args: { testId: dataTestId },
}
