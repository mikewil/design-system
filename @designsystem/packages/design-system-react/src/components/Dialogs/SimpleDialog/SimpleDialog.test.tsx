import { render, screen } from '@testing-library/react'
import { SimpleDialog } from './SimpleDialog'
import { SimpleDialogTester } from '@designsystem/design-system-react-testing/src/components/SimpleDialogTester'

class ResizeObserverMock {
  private readonly callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe(target: Element): void {
    const entry = {
      target,
      contentRect: target.getBoundingClientRect(),
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
    }
    this.callback([entry], this)
  }
  unobserve() {}

  disconnect() {}
}

ResizeObserver = ResizeObserverMock

describe('SimpleDialog', () => {
  it('should render the dialog and its content', () => {
    const heading = 'Test heading'
    const confirmText = 'Confirm'
    const cancelText = 'Cancel'
    const testId = 'designsystem-simple-dialog'

    render(
      <SimpleDialog
        testId={testId}
        heading={heading}
        confirmText={confirmText}
        cancelText={cancelText}
        isOpen={true}
        onConfirm={() => {}}
        onCancel={() => {}}
      >
        Test content
      </SimpleDialog>,
    )

    const dialogElement = new SimpleDialogTester(screen.getByTestId(testId))

    expect(dialogElement.heading).toEqual(heading)
    expect(dialogElement.confirmText).toEqual(confirmText)
    expect(dialogElement.cancelText).toEqual(cancelText)
    expect(dialogElement.content).toEqual('Test content')
  })

  it('should not render the dialog and its content when not open', () => {
    const heading = 'Test heading'
    const confirmText = 'Confirm'
    const testId = 'designsystem-simple-dialog'

    render(
      <SimpleDialog
        testId={testId}
        heading={heading}
        confirmText={confirmText}
        isOpen={false}
      >
        Test content
      </SimpleDialog>,
    )

    const dialogElement = screen.queryByTestId(testId)

    expect(dialogElement).toBeNull()
  })
})
