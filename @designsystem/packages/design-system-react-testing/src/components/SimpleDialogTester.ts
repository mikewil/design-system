import { UserEvent } from '@testing-library/user-event/index'
import { within } from '@testing-library/dom'

export class SimpleDialogTester {
  private readonly element: HTMLElement
  private readonly user: UserEvent

  constructor(element: HTMLElement, userEvent: UserEvent) {
    this.element = element
    this.user = userEvent
  }

  public get heading(): string | null {
    return (
      within(this.element).getByTestId('designsystem-dialog-header')?.textContent ||
      null
    )
  }

  public get confirmText(): string | null {
    return (
      within(this.element).getByTestId('designsystem-dialog-confirm-button')
        ?.textContent || null
    )
  }

  public get cancelText(): string | null {
    return (
      within(this.element).getByTestId('designsystem-dialog-cancel-button')
        ?.textContent || null
    )
  }

  public async confirm() {
    const confirmButton = within(this.element).getByTestId(
      'designsystem-dialog-confirm-button',
    )

    if (confirmButton) {
      await this.user.click(confirmButton)
    }
  }

  public async cancel() {
    const cancelButton = within(this.element).getByTestId(
      'designsystem-dialog-cancel-button',
    )

    if (cancelButton) {
      await this.user.click(cancelButton)
    }
  }

  public get content(): string | null {
    return (
      within(this.element).getByTestId('designsystem-dialog-content')?.innerHTML ||
      null
    )
  }
}
