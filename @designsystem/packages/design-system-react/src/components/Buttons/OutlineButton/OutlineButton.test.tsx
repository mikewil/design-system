import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { OutlineButton } from './OutlineButton'
import { Symbols_Image } from '../../../icons'

describe('Outline Button', () => {
  const testId = 'designsystem-outline-button'

  it('should render default button', async () => {
    const buttonText = 'Button'
    const handleClickMock = jest.fn()
    const user = userEvent.setup()

    render(
      <OutlineButton
        buttonText={buttonText}
        testId={testId}
        isDisabled={false}
        isInProgress={false}
        onClick={handleClickMock}
      />,
    )

    const button = screen.getByTestId(testId)
    expect(button.textContent).toBe(buttonText)
    expect(screen.queryByTestId(`${testId}-spinner`)).toBeNull()
    await user.click(button)
    expect(handleClickMock).toHaveBeenCalledTimes(1)
  })

  it('should not be clickable when disabled', async () => {
    const buttonText = 'Button'
    const handleClickMock = jest.fn()
    const user = userEvent.setup()

    render(
      <OutlineButton
        buttonText={buttonText}
        testId={testId}
        isDisabled={true}
        isInProgress={false}
        onClick={handleClickMock}
      />,
    )

    const button = screen.getByTestId(testId)
    expect(button.className).toContain('disabled')
    expect(button.className).toContain('default')
    await user.click(button)
    expect(handleClickMock).not.toHaveBeenCalled()
  })

  it('should render indeterminate spinner', async () => {
    const buttonText = 'Button'
    const handleClickMock = jest.fn()
    const user = userEvent.setup()

    render(
      <OutlineButton
        buttonText={buttonText}
        testId={testId}
        isDisabled={false}
        isInProgress={true}
        onClick={handleClickMock}
      />,
    )

    const button = screen.getByTestId(testId)
    expect(screen.getByTestId(`${testId}-spinner`)).not.toBeNull()
    await user.click(button)
    expect(handleClickMock).not.toHaveBeenCalled()
  })

  it('click to select action button', async () => {
    const buttonText = 'Button'
    const handleClickMock = jest.fn()
    const user = userEvent.setup()

    render(
      <OutlineButton
        variant="selection"
        buttonText={buttonText}
        testId={testId}
        isDisabled={false}
        isInProgress={false}
        onClick={handleClickMock}
        FollowingImage={Symbols_Image}
      />,
    )

    const button = screen.getByTestId(testId)
    expect(screen.getByTestId('following-image')).not.toBeNull()
    expect(button.className).toContain('selection')
    expect(button.className).toContain('closed')
    await user.click(button)
    expect(handleClickMock).toHaveBeenCalledTimes(1)
    expect(button.className).toContain('open')
    expect(screen.getByTestId('close-icon')).not.toBeNull()
    await user.click(button)
    expect(screen.getByTestId('following-image')).not.toBeNull()
    expect(button.className).toContain('closed')
  })
})
