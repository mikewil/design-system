import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  HorizontalTabs,
  HorizontalTabList,
  HorizontalTabPanel,
  HorizontalTab,
} from '.'
import { HorizontalTabsTester } from '@designsystem/design-system-react-testing'

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

describe('HorizontalTabs', () => {
  it('should render', async () => {
    // arrange
    const user = userEvent.setup()
    const { getByTestId } = render(
      <HorizontalTabs
        testId="designsystem-horizontal-tab"
        onChange={() => jest.fn()}
      >
        <HorizontalTabList>
          <HorizontalTab id="tab1">Tab 1</HorizontalTab>
          <HorizontalTab id="tab2">Tab 2</HorizontalTab>
        </HorizontalTabList>
        <HorizontalTabPanel id="tab1">Tab 1 Content</HorizontalTabPanel>
        <HorizontalTabPanel id="tab2">Tab 2 Content</HorizontalTabPanel>
      </HorizontalTabs>,
    )

    // Arrange
    const horizontalTabs = new HorizontalTabsTester(
      getByTestId('designsystem-horizontal-tab'),
      user,
    )

    // Assert
    expect(horizontalTabs.tabCount).toBe(2)
    expect(horizontalTabs.selectedTabContent).toContain('Tab 1 Content')
    await horizontalTabs.clickTab('-1')
    expect(horizontalTabs.selectedTabContent).toContain('Tab 2 Content')
  })
})
