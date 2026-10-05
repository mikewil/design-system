/* Note: Why do test of the popover use screen instead of element AND include the passed in test id?
    When you render the SolidDropdown component, the popover is not a child of the SolidDropdown component.
    If you wanted to test multiple dropdowns on the same page, you would need to include the test id to differentiate between the popovers.
*/

import { screen } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class SolidDropdownTester {
  private readonly dropdownContainer: HTMLElement
  private readonly user: UserEvent

  constructor(dropdownContainer: HTMLElement, userEvent: UserEvent) {
    this.dropdownContainer = dropdownContainer
    this.user = userEvent
  }

  /**
   * Get the title of the dropdown
   */
  public get title(): string | null {
    return this.dropdownContainer.textContent?.trim() || null
  }

  /**
   * Detect if the dropdown is open or not
   */
  public isExpanded(testId: string): boolean {
    return !!screen.queryByTestId(`${testId}-solid-dropdown-popover`)
  }

  /**
   * Toggle the dropdown open or closed
   */
  public async toggleDropdown(testId: string) {
    await this.user.click(
      screen.getByTestId(`${testId}-solid-dropdown-select-value`),
    )
  }

  /**
   *
   * @param item The item to be selected
   */
  public async selectItem(item: string) {
    await this.user.click(screen.getByTestId(`${item}-clickable-div`))
  }

  /**
   * Get all the items in the dropdown
   */
  public getItems(testId: string): string[] {
    const dropdownPopover = screen.queryByTestId(
      `${testId}-solid-dropdown-popover`,
    )
    if (!dropdownPopover) {
      return []
    }
    const itemElements = dropdownPopover.querySelectorAll('[role="option"]')
    return Array.from(itemElements).map((el) => el.textContent?.trim() || '')
  }
}
