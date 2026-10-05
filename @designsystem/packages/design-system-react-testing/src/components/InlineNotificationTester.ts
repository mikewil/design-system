import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class InlineNotificationTester {
  private readonly inlineNotificationElement: HTMLElement
  private readonly user: UserEvent

  constructor(inlineNotificationElement: HTMLElement, userEvent: UserEvent) {
    this.inlineNotificationElement = inlineNotificationElement
    this.user = userEvent
  }

  public get title(): string | null {
    return (
      within(this.inlineNotificationElement).getByTestId('title')
        ?.textContent || null
    )
  }

  public get text(): string | null {
    return (
      within(this.inlineNotificationElement).getByTestId('text')?.textContent ||
      null
    )
  }

  public get notificationLevel(): string {
    return this.inlineNotificationElement.getAttribute('data-level') || ''
  }

  public get actionLinkText(): string | null {
    return (
      within(this.inlineNotificationElement).getByTestId('actionLink')
        ?.textContent || null
    )
  }

  public get hasLeftHeader(): boolean {
    return !!within(this.inlineNotificationElement).queryByTestId('leftHeader')
  }

  public async clickActionLink() {
    await this.user.click(
      within(this.inlineNotificationElement).getByTestId('actionLink'),
    )
  }

  public async clickCloseIcon() {
    await this.user.click(
      within(this.inlineNotificationElement).getByTestId('closeIcon'),
    )
  }
}
