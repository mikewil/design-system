import { render, screen } from '@testing-library/react'
import { Flex, FlexProps } from './Flex'
import { Context as ResponsiveContext } from 'react-responsive'

describe('Flex Component', () => {
  it('should apply correct styles for default props', () => {
    // Arrange
    const expectedStyles = {
      display: 'flex',
      flexWrap: 'wrap',
    }

    // Act
    const { getByTestId } = render(
      <Flex testId="flex-test">
        <span></span>
      </Flex>,
    )

    // Assert
    expect(getByTestId('flex-test')).toHaveStyle(expectedStyles)
  })

  it('should handle responsive justifyContent and alignItems', () => {
    // Arrange
    const props: Omit<FlexProps, 'children'> = {
      justifyContent: { S: 'flex-start', M: 'center' },
      alignItems: { S: 'flex-end', M: 'stretch' },
    }
    const expectedStyles = {
      justifyContent: 'center',
      alignItems: 'stretch',
    }

    // Act
    render(
      <ResponsiveContext.Provider value={{ width: 1000 }}>
        <Flex testId="flex-test" {...props}>
          <span></span>
        </Flex>
      </ResponsiveContext.Provider>,
    )

    // Assert
    expect(screen.getByTestId('flex-test')).toHaveStyle(expectedStyles)
  })

  it('should handle responsive gap, columnGap, and rowGap', () => {
    // Arrange
    const props: Omit<FlexProps, 'children'> = {
      gap: { S: 'spacing-1', M: 'spacing-2' },
      columnGap: { S: 'spacing-1', M: 'spacing-2' },
      rowGap: { S: 'spacing-1', M: 'spacing-2' },
    }
    const expectedStyles = {
      gap: '8px',
      columnGap: '8px',
      rowGap: '8px',
    }

    // Act
    render(
      <ResponsiveContext.Provider value={{ width: 1000 }}>
        <Flex testId="flex-test" {...props}>
          <span></span>
        </Flex>
      </ResponsiveContext.Provider>,
    )

    // Assert
    expect(screen.getByTestId('flex-test')).toHaveStyle(expectedStyles)
  })
})
