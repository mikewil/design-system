import { screen, render } from '@testing-library/react'
import { useStyleProps } from './useStyles'
import { StyleProps } from './useStyles.types'
import { Context as ResponsiveContext } from 'react-responsive'

const TestComponent = (props: StyleProps) => {
  const style = useStyleProps(props)
  return <>{JSON.stringify(style)}</>
}

function verifyExpectedStyles(styles: React.CSSProperties) {
  expect(screen.getByText(JSON.stringify(styles))).toBeInTheDocument()
}

describe('useStyles', () => {
  it('should not set styles if none are specified', () => {
    // Arrange
    const props: StyleProps = {}
    const expectedStyles: React.CSSProperties = {}

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle multiple margin props', () => {
    // Arrange
    const props: StyleProps = {
      margin: 'spacing-1',
      marginEnd: 'spacing-0',
    }
    const expectedStyles: React.CSSProperties = {
      margin: '4px',
      marginRight: '2px',
    }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle responsive margin props', () => {
    // Arrange
    const props: StyleProps = { margin: { S: 'spacing-0', M: 'spacing-1' } }
    const expectedStyles: React.CSSProperties = { margin: '4px' }

    // Act
    render(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <TestComponent {...props} />
      </ResponsiveContext.Provider>,
    )

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle padding props', () => {
    // Arrange
    const props: StyleProps = { padding: 'spacing-1' }
    const expectedStyles: React.CSSProperties = { padding: '4px' }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle responsive padding props', () => {
    // Arrange
    const props: StyleProps = {
      padding: { S: 'spacing-0', M: 'spacing-1' },
    }
    const expectedStyles: React.CSSProperties = { padding: '4px' }

    // Act
    render(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <TestComponent {...props} />
      </ResponsiveContext.Provider>,
    )

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle backgroundColor prop', () => {
    // Arrange
    const props: StyleProps = {
      backgroundColor: 'General/foreground-primary',
    }
    const expectedStyles: React.CSSProperties = {
      backgroundColor: '#3d3d3d',
    }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle color prop', () => {
    // Arrange
    const props: StyleProps = { color: 'General/foreground-secondary' }
    const expectedStyles: React.CSSProperties = { color: '#a3a3a3' }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle borderColor prop', () => {
    // Arrange
    const props: StyleProps = { borderColor: 'General/outline-primary' }
    const expectedStyles: React.CSSProperties = { borderColor: '#a3a3a3' }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle flex properties', () => {
    // Arrange
    const props: StyleProps = {
      flex: '1 0 auto',
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '50%',
      justifySelf: 'center',
      alignSelf: 'flex-start',
      order: 2,
    }
    const expectedStyles: React.CSSProperties = {
      flex: '1 0 auto',
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '50%',
      justifySelf: 'center',
      alignSelf: 'flex-start',
      order: 2,
    }

    // Act
    render(<TestComponent {...props} />)

    // Assert
    verifyExpectedStyles(expectedStyles)
  })

  it('should handle responsive flex properties', () => {
    // Arrange
    const props: StyleProps = {
      flexGrow: { S: 1, M: 2 },
      alignSelf: { S: 'flex-start', M: 'center' },
    }
    const expectedStyles: React.CSSProperties = {
      flexGrow: 2,
      alignSelf: 'center',
    }

    // Act
    render(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <TestComponent {...props} />
      </ResponsiveContext.Provider>,
    )

    // Assert
    verifyExpectedStyles(expectedStyles)
  })
})
