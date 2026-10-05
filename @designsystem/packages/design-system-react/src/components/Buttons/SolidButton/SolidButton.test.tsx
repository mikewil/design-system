import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SolidButton } from './SolidButton'
import { Products_Sterilizer } from '../../../icons'
import { SolidButtonTester } from '@designsystem/design-system-react-testing'

describe('SolidButton', () => {
  const testId = 'designsystem-solid-button'

  it('should render the button and its text', () => {
    const buttonText = 'Test button'
    const variant = 'primary'
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        buttonText={buttonText}
        variant={variant}
        leadingImage={Products_Sterilizer}
      ></SolidButton>,
    )

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )

    expect(buttonElement.buttonText).toEqual(buttonText)
    expect(buttonElement.variant).toEqual(variant)
    expect(buttonElement.isDisabled).toBe(false)
    expect(buttonElement.isInProgress).toBe(false)
    expect(buttonElement.hasLeadingImage).toBe(true)
    expect(buttonElement.hasFollowingImage).toBe(false)
  })

  it('should render secondary loading the button', () => {
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        variant="secondary"
        progress={true}
        leadingImage={Products_Sterilizer}
      ></SolidButton>,
    )

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )

    expect(buttonElement.isInProgress).toBe(true)
    expect(buttonElement.variant).toEqual('secondary')
  })

  it('should NOT render the left icon if in a progress state', () => {
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        variant="primary"
        progress={true}
        leadingImage={Products_Sterilizer}
      ></SolidButton>,
    )

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )
    expect(buttonElement.hasLeadingImage).toBe(false)
  })

  it('should NOT render an icon if one is not specified', () => {
    const user = userEvent.setup()

    render(<SolidButton testId={testId} variant="primary"></SolidButton>)

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )

    expect(buttonElement.hasLeadingImage).toBe(false)
    expect(buttonElement.hasFollowingImage).toBe(false)
  })

  it('should render both icons if both are specified', () => {
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        variant="primary"
        leadingImage={Products_Sterilizer}
        followingImage={Products_Sterilizer}
      ></SolidButton>,
    )
    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )

    expect(buttonElement.hasLeadingImage).toBe(true)
    expect(buttonElement.hasFollowingImage).toBe(true)
  })

  test('should handle onClick when clicked', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        buttonText="Test button"
        variant="primary"
        onClick={handleClick}
      />,
    )

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )
    await buttonElement.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('should not handle onClick if disabled', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()

    render(
      <SolidButton
        testId={testId}
        buttonText="Test button"
        variant="primary"
        disabled={true}
        onClick={handleClick}
      />,
    )

    const buttonElement = new SolidButtonTester(
      screen.getByTestId(testId),
      user,
    )
    await buttonElement.click()
    expect(handleClick).toHaveBeenCalledTimes(0)
  })
})
