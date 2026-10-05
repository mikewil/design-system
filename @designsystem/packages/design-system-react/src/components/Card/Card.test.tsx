import { Card } from './Card'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { CardTester } from '@designsystem/design-system-react-testing'
import { Products_Sterilizer } from '../../icons/generated-icons/Products_Sterilizer'
import { Products_Compressor } from '../../icons/generated-icons/Products_Compressor'

describe('Card', () => {
  const testId = 'designsystem-card'
  const handleClick = jest.fn()

  it('should show title, subtitle, and sub headers', async () => {
    const user = userEvent.setup()
    const { getByTestId } = render(
      <Card
        testId={testId}
        title={'Title Text'}
        subtitle={'Subtitle Text'}
        headerStyle={'Subtitle'}
        detailStyle={'content'}
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
        isClickThru={true}
        isImageVisible={true}
        showStatusBar={true}
        statusType={'Success'}
        titleIcon={Products_Sterilizer}
        customTitle={<div>Custom Title</div>}
        customContent={<div>Custom Content</div>}
        detailImages={[Products_Sterilizer, Products_Compressor]}
        onClick={handleClick}
      />,
    )

    const cardElement = new CardTester(getByTestId(testId), user)

    // Should Show ...
    expect(cardElement.title).toBe('Title Text')
    expect(cardElement.subtitle).toBe('Subtitle Text')
    expect(cardElement.contentTextByIndex).toEqual([
      { title: 'Title', subtitle: 'Subtitle' },
      { title: 'Title', subtitle: 'Subtitle' },
    ])
    expect(cardElement.statusType).toBe('Success')
    expect(cardElement.isClickThru()).toBe(true)
    await cardElement.click()
    expect(handleClick).toHaveBeenCalled()

    // Should Not Show ...
    expect(cardElement.imageContent).not.toBeNull()
    expect(cardElement.images).toHaveLength(0)
    expect(cardElement.customTitle).toBeNull()
    expect(cardElement.customContent).toBeNull()
  })

  it('should show title and images', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Card
        testId={testId}
        title={'Title Text'}
        subtitle={'Subtitle Text'}
        headerStyle={'Title'}
        detailStyle={'image'}
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
        isClickThru={true}
        isImageVisible={true}
        showStatusBar={true}
        statusType={'Success'}
        titleIcon={Products_Sterilizer}
        detailImages={[Products_Sterilizer, Products_Compressor]}
        customTitle={<div>Custom Title</div>}
        customContent={<div>Custom Content</div>}
      />,
    )

    const cardElement = new CardTester(getByTestId(testId), user)

    // Should Show ...
    expect(cardElement.title).toBe('Title Text')
    expect(cardElement.subtitle).toBeNull()
    expect(cardElement.contentTextByIndex).toBeNull()
    expect(cardElement.statusType).toBe('Success')
    expect(cardElement.isClickThru()).toBe(true)
    expect(cardElement.imageContent).not.toBe(null)
    expect(cardElement.images).toHaveLength(2)

    // Should Not Show ...
    expect(cardElement.customTitle).toBeNull()
    expect(cardElement.customContent).toBeNull()

    // Trigger the click event
    await user.click(getByTestId(testId))

    // Check if the onClick handler was not called
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should render custom content', async () => {
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Card
        testId={testId}
        title={'Title Text'}
        subtitle={'Subtitle Text'}
        headerStyle={'Custom'}
        detailStyle={'custom'}
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
        isClickThru={false}
        isImageVisible={true}
        showStatusBar={false}
        statusType={'Success'}
        titleIcon={Products_Sterilizer}
        detailImages={[Products_Sterilizer, Products_Compressor]}
        customTitle={<div>Custom Title</div>}
        customContent={<div>Custom Content</div>}
      />,
    )

    const cardElement = new CardTester(getByTestId(testId), user)

    // Should Show ...
    expect(cardElement.customTitle).toHaveTextContent('Custom Title')
    expect(cardElement.customContent).toHaveTextContent('Custom Content')

    // Should Not Show ...
    expect(cardElement.title).toBeNull()
    expect(cardElement.subtitle).toBeNull()
    expect(cardElement.contentTextByIndex).toBeNull()
    expect(cardElement.statusType).toBeNull()
    expect(cardElement.isClickThru()).toBe(false)
    expect(cardElement.imageContent).toBeNull()
    expect(cardElement.images).toHaveLength(0)
  })

  it('should show custom title and no details content', async () => {
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Card
        testId={testId}
        title={'Title Text'}
        subtitle={'Subtitle Text'}
        headerStyle={'Custom'}
        detailStyle={'none'}
        detailContentText={[
          { title: 'Title', subtitle: 'Subtitle' },
          { title: 'Title', subtitle: 'Subtitle' },
        ]}
        isClickThru={true}
        isImageVisible={true}
        showStatusBar={true}
        statusType={'Success'}
        titleIcon={Products_Sterilizer}
        detailImages={[Products_Sterilizer, Products_Compressor]}
        customTitle={<div>Custom Title</div>}
        customContent={<div>Custom Content</div>}
      />,
    )

    const cardElement = new CardTester(getByTestId(testId), user)

    // Should Show
    expect(cardElement.customTitle).toHaveTextContent('Custom Title')

    // Should Not Show
    expect(cardElement.customContent).toBeNull()
    expect(cardElement.imageContent).toBeNull()
    expect(cardElement.contentTextByIndex).toBeNull()
    expect(cardElement.title).toBeNull()
    expect(cardElement.subtitle).toBeNull()
  })

  it('should handle misc edge cases', async () => {
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Card
        testId={testId}
        title={'Title Text'}
        subtitle={'Subtitle Text'}
        headerStyle={'Custom'}
        detailStyle={'none'}
        //contentText={}
        isClickThru={true}
        isImageVisible={true}
        showStatusBar={true}
        //statusType={'Success'}
        titleIcon={Products_Sterilizer}
        //images={[Products_Sterilizer, Products_Compressor]}
        customTitle={<div>Custom Title</div>}
        customContent={<div>Custom Content</div>}
      />,
    )

    const cardElement = new CardTester(getByTestId(testId), user)

    // Should Show ...
    expect(cardElement.customTitle).toHaveTextContent('Custom Title')

    // Should Not Show ...
    expect(cardElement.customContent).toBeNull()
    expect(cardElement.imageContent).toBeNull()
    expect(cardElement.contentTextByIndex).toBeNull()
  })

  it('should be ok with everything null', async () => {
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Card
      // testId={testId}
      // title={'Title Text'}
      // subtitle={'Subtitle Text'}
      // headerStyle={'Custom'}
      // detailStyle={'None'}
      // //contentText={}
      // isClickThru={true}
      // isImageVisible={true}
      // showStatusBar={true}
      // //statusType={'Success'}
      // titleIcon={Products_Sterilizer}
      // //images={[Products_Sterilizer, Products_Compressor]}
      // customTitle={<div>Custom Title</div>}
      // customContent={<div>Custom Content</div>}
      />,
    )
    const cardElement = new CardTester(getByTestId('title'), user)
    expect(cardElement).not.toBeNull()
  })
})
