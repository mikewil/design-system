import { Chip } from './Chip'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ChipTester } from '@designsystem/design-system-react-testing'
import { Products_Sterilizer } from '../../../icons'

describe('Chip', () => {
  const testId = 'designsystem-chip'

  it('should render the chip and its text', () => {
    const chipText = 'Test chip'
    const variant = 'single'
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Chip
        testId={testId}
        chipText={chipText}
        chipIcon={Products_Sterilizer}
      ></Chip>,
    )

    const chipElement = new ChipTester(getByTestId(testId), user)
    expect(chipElement.chipText).toEqual(chipText)
    expect(chipElement.variant).toEqual(variant)
    expect(chipElement.hasIcon).toBe(true)
  })

  it('should render the chip without text', () => {
    const variant = 'single'
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Chip
        testId={testId}
        variant={variant}
        chipIcon={Products_Sterilizer}
      ></Chip>,
    )

    const chipElement = new ChipTester(getByTestId(testId), user)
    expect(chipElement.chipText).toBeNull()
    expect(chipElement.variant).toEqual(variant)
    expect(chipElement.hasIcon).toBe(true)
  })

  it('should render without an icon', () => {
    const variant = 'single'
    const chipText = 'Chip text'
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Chip testId={testId} variant={variant} chipText={chipText}></Chip>,
    )

    const chipElement = new ChipTester(getByTestId(testId), user)
    expect(chipElement.chipText).toBe(chipText)
    expect(chipElement.variant).toEqual(variant)
    expect(chipElement.hasIcon).toBe(false)
  })

  it('should render the chip with the multiple variant', () => {
    const variant = 'multiple'
    const chipText = 'Chip text'
    const user = userEvent.setup()

    const { getByTestId } = render(
      <Chip
        testId={testId}
        variant={variant}
        chipText={chipText}
        chipIcon={Products_Sterilizer}
      ></Chip>,
    )

    const chipElement = new ChipTester(getByTestId(testId), user)
    expect(chipElement.chipText).toBe(chipText)
    expect(chipElement.variant).toEqual(variant)
    expect(chipElement.hasIcon).toBe(true)
  })

  it('should toggle selection and call onClick when clicked', async () => {
    const chipText = 'Clickable Chip'
    const variant = 'single'
    const user = userEvent.setup()

    const onClickMock = jest.fn()

    const { getByTestId } = render(
      <Chip
        testId={testId}
        chipText={chipText}
        variant={variant}
        selected={false}
        onClick={onClickMock}
      />,
    )

    const chipElement = new ChipTester(getByTestId(testId), user)
    expect(chipElement.isSelected).toBe(false)
    await chipElement.click()
    expect(chipElement.isSelected).toBe(true)
    expect(onClickMock).toHaveBeenCalledTimes(1)
    await chipElement.click()
    expect(chipElement.isSelected).toBe(false)
  })
})
