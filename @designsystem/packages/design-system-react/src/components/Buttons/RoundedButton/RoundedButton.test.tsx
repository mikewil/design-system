import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Products_Sterilizer } from '../../../icons'
import { RoundedButton } from './RoundedButton'

describe('RoundedButton', () => {
  const testId = 'designsystem-rounded-button'

  it('should render the button with label, image, and badge', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="textimage"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    expect(buttonElement).toHaveTextContent(buttonText)
    expect(getByTestId('buttonImage')).not.toBeNull()
    expect(getByTestId('badge')).not.toBeNull()

    await user.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should render the button with label only', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId, queryByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="text"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    expect(buttonElement).toHaveTextContent(buttonText)
    expect(queryByTestId('buttonImage')).toBeNull()
    expect(queryByTestId('badge')).toBeNull()

    await user.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should render the button with a size M image and badge only', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="image"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    expect(buttonElement).toHaveTextContent('')
    expect(getByTestId('buttonImage')).not.toBeNull()
    expect(getByTestId('badge')).not.toBeNull()
    expect(buttonElement.className).toContain('sizeM')

    await user.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should render the button with a size S image only', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId, queryByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={false}
        layout="image"
        size="S"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    expect(buttonElement).toHaveTextContent('')
    expect(getByTestId('buttonImage')).not.toBeNull()
    expect(queryByTestId('badge')).toBeNull()
    expect(buttonElement.className).toContain('sizeS')

    await user.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should render the button with "text" layout as disabled', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="text"
        state="disabled"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should render the button with "textimage" layout as disabled', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="textimage"
        state="disabled"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should render the button with "image" layout as disabled', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="image"
        state="disabled"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should render the button with "text" layout as in-progress', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId, queryByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="text"
        state="progress"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)
    expect(queryByTestId('buttonImage')).toBeNull()
    expect(queryByTestId('badge')).toBeNull()
    expect(getByTestId('designsystem-indeterminate-spinner')).not.toBeNull()

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should render the button with "textimage" layout as in-progress', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId, queryByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="textimage"
        state="progress"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)
    expect(queryByTestId('buttonImage')).toBeNull()
    expect(queryByTestId('badge')).toBeNull()
    expect(getByTestId('designsystem-indeterminate-spinner')).not.toBeNull()

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should render the button with "image" layout as in-progress', async () => {
    const buttonText = 'Test button'
    const user = userEvent.setup()
    const onClickMock = jest.fn()

    const { getByTestId, queryByTestId } = render(
      <RoundedButton
        testId={testId}
        buttonText={buttonText}
        ButtonImage={Products_Sterilizer}
        showBadge={true}
        layout="image"
        state="progress"
        onClick={onClickMock}
      ></RoundedButton>,
    )

    const buttonElement = getByTestId(testId)
    expect(queryByTestId('buttonImage')).toBeNull()
    expect(queryByTestId('badge')).toBeNull()
    expect(getByTestId('designsystem-indeterminate-spinner')).not.toBeNull()

    await user.click(buttonElement)
    expect(onClickMock).not.toHaveBeenCalled()
  })
})
