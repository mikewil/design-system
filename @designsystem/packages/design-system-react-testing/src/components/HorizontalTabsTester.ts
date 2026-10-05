import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class HorizontalTabsTester {
  private readonly element: HTMLElement
  private readonly user: UserEvent

  constructor(element: HTMLElement, userEvent: UserEvent) {
    this.element = element
    this.user = userEvent
  }

  public get tabCount(): number {
    return within(this.element).queryAllByRole('tab').length
  }

  public get selectedTabKey(): string | null {
    return (
      this.element.querySelector('[data-selected]')?.getAttribute('data-key') ||
      null
    )
  }

  public get selectedTabContent(): string | null {
    return within(this.element).queryByRole('tabpanel')?.innerHTML || null
  }

  public async clickTab(tabIndex: string) {
    const tab = this.element.querySelector(
      `[tabindex="${tabIndex}"]`,
    ) as HTMLElement
    if (tab) {
      await this.user.click(tab)
    } else {
      throw new Error(`Tab with tabindex '${tabIndex}' not found`)
    }
  }
}
