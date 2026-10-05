import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class SolidButtonTester {
  private readonly buttonElement: HTMLElement
  private readonly user: UserEvent

  constructor(buttonElement: HTMLElement, userEvent: UserEvent) {
    this.buttonElement = buttonElement
    this.user = userEvent
  }

  public get variant(): string {
    return this.buttonElement.classList[1]
  }

  public get buttonText(): string | null {
    return this.buttonElement.textContent?.trim() || null
  }

  public get isDisabled(): boolean {
    return this.buttonElement.classList.contains('disabled')
  }

  public get isInProgress(): boolean {
    return this.buttonElement.classList.contains('progress')
  }

  public get hasLeadingImage(): boolean {
    return within(this.buttonElement).queryByTestId('leading-image') !== null
  }

  public get hasFollowingImage(): boolean {
    return within(this.buttonElement).queryByTestId('following-image') !== null
  }

  public async click() {
    await this.user.click(this.buttonElement)
  }
}
