import { render, screen } from '@testing-library/react'
import { EncapsulatedIcon } from './EncapsulatedIcon'
import { Symbols_Image } from '../../icons'

const testId = 'designsystem-icon'

describe('EncapsulatedIcon', () => {
  it('should render S size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeS',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeS',
    )
  })

  it('should render XS size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="XS" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeXS',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeXS',
    )
  })

  it('should render XXS size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="XXS" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeXXS',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeXS',
    )
  })

  it('should render M size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="M" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeM',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeM',
    )
  })

  it('should render L size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="L" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeL',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeM',
    )
  })

  it('should render XL size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="XL" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeXL',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeXL',
    )
  })

  it('should render XXL size icon', () => {
    render(<EncapsulatedIcon Icon={Symbols_Image} size="XXL" testId={testId} />)
    expect(screen.getByTestId(`${testId}-container`).className).toContain(
      'iconContainerSizeXXL',
    )
    expect(screen.getByTestId(testId).getAttribute('class')).toContain(
      'iconSizeXXXL',
    )
  })
})
