import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class CheckboxTester {
  private readonly checkboxElement: HTMLElement
  private readonly user: UserEvent

  constructor(checkboxElement: HTMLElement, userEvent: UserEvent) {
    this.checkboxElement = checkboxElement
    this.user = userEvent
  }

  public get isChecked(): boolean {
    // Check if the polyline element (checkmark) is visible
    return this.checkboxElement.querySelector('polyline') !== null
  }

  public get isMultiple(): boolean {
    // Check if the rectangle element (representing the indeterminate state) is visible
    return this.checkboxElement.querySelector('rect') !== null
  }

  public get isDisabled(): boolean {
    // Check if the 'disabled' attribute is present on the input element
    return (
      (within(this.checkboxElement).getByRole('checkbox') as HTMLInputElement)
        ?.disabled ?? false
    )
  }

  public async select() {
    const checkbox = within(this.checkboxElement).getByRole('checkbox')
    if (!checkbox) throw new Error(`Checkbox not found`)
    await this.user.click(checkbox)
  }
}
