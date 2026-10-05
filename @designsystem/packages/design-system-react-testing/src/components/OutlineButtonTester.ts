import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class OutlineButtonTester {
  private readonly buttonElement: HTMLElement
  private readonly user: UserEvent

  constructor(buttonElement: HTMLElement, userEvent: UserEvent) {
    this.buttonElement = buttonElement
    this.user = userEvent
  }

  public hasVariant(variant: 'default' | 'selection'): boolean {
    return this.buttonElement.getAttribute('data-variant') === variant
  }

  public hasLeadingImage(): boolean {
    const icon = within(this.buttonElement).queryByTestId('leading-image')
    return icon !== null
  }

  public hasFollowingImage(): boolean {
    const icon = within(this.buttonElement).queryByTestId('following-image')
    return icon !== null
  }

  public async click() {
    await this.user.click(this.buttonElement)
  }
}
