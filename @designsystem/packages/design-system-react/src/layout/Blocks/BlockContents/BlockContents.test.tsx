import { BlockContentsTester } from '@designsystem/design-system-react-testing/lib'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Actions_Edit } from '../../../icons'
import { BlockContents, editButtonTestId } from './BlockContents'

describe('Block Contents', () => {
  it('should render Head style with action link and edit button and badge', async () => {
    const link = 'https://example.com'
    const onClickMock = jest.fn()
    const user = userEvent.setup()

    const { getByTestId } = render(
      <BlockContents
        header="Header"
        text="Text"
        actionLink={link}
        layout="headAction"
        ButtonImage={Actions_Edit}
        onButtonClicked={onClickMock}
        showBadge
      />,
    )
    const blockContentsTester = new BlockContentsTester(
      getByTestId('designsystem-block-contents'),
      user,
    )

    expect(blockContentsTester.hasLayout('headAction')).toBeTruthy()
    expect(blockContentsTester.hasHeader('Header')).toBeTruthy()
    expect(blockContentsTester.hasText('Text')).toBeTruthy()
    expect(blockContentsTester.hasActionLink(link)).toBeTruthy()
    await blockContentsTester.clickButton()
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(blockContentsTester.hasBadge()).toBeTruthy()
  })

  it('should render Head style with header and text only', () => {
    const user = userEvent.setup()
    const { getByTestId, queryByTestId } = render(
      <BlockContents header="Header" text="Text" layout="head" />,
    )
    const blockContentsTester = new BlockContentsTester(
      getByTestId('designsystem-block-contents'),
      user,
    )

    expect(blockContentsTester.hasLayout('head')).toBeTruthy()
    expect(blockContentsTester.hasHeader('Header')).toBeTruthy()
    expect(blockContentsTester.hasText('Text')).toBeTruthy()
    expect(blockContentsTester.hasActionLink()).toBeFalsy()
    expect(queryByTestId(editButtonTestId)).toBeNull()
    expect(queryByTestId('badge')).toBeNull()
  })

  it('should render Details style with action link and edit button', async () => {
    const link = 'https://example.com'
    const onClickMock = jest.fn()
    const user = userEvent.setup()

    const { getByTestId } = render(
      <BlockContents
        header="Header"
        text="Text"
        actionLink={link}
        layout="detailsAction"
        ButtonImage={Actions_Edit}
        onButtonClicked={onClickMock}
      />,
    )
    const blockContentsTester = new BlockContentsTester(
      getByTestId('designsystem-block-contents'),
      user,
    )

    expect(blockContentsTester.hasLayout('detailsAction')).toBeTruthy()
    expect(blockContentsTester.hasHeader('Header')).toBeTruthy()
    expect(blockContentsTester.hasText('Text')).toBeTruthy()
    expect(blockContentsTester.hasActionLink(link)).toBeTruthy()
    await blockContentsTester.clickButton()
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(blockContentsTester.hasBadge()).toBeFalsy()
  })

  it('should render Details style with header and text only', () => {
    const user = userEvent.setup()
    const { getByTestId, queryByTestId } = render(
      <BlockContents header="Header" text="Text" layout="details" />,
    )
    const blockContentsTester = new BlockContentsTester(
      getByTestId('designsystem-block-contents'),
      user,
    )

    expect(blockContentsTester.hasLayout('details')).toBeTruthy()
    expect(blockContentsTester.hasHeader('Header')).toBeTruthy()
    expect(blockContentsTester.hasText('Text')).toBeTruthy()
    expect(blockContentsTester.hasActionLink()).toBeFalsy()
    expect(queryByTestId(editButtonTestId)).toBeNull()
    expect(queryByTestId('badge')).toBeNull()
  })
})
