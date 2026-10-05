import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'
export class ChipTester {
  private readonly chipElement: HTMLElement
  private readonly user: UserEvent

  constructor(chipElement: HTMLElement, userEvent: UserEvent) {
    this.chipElement = chipElement
    this.user = userEvent
  }

  public get variant(): string {
    return this.chipElement.classList[1]
  }

  public get hasText(): boolean {
    return this.chipElement.textContent?.trim() !== null
  }

  public get chipText(): string | null {
    return this.chipElement.textContent?.trim() || null
  }

  public get isSelected(): boolean {
    return this.chipElement.classList.contains('selected')
  }

  public get hasIcon(): boolean {
    return within(this.chipElement).queryByTestId('chip-icon') !== null
  }

  public async click() {
    await this.user.click(this.chipElement)
  }
}
