import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class SolidSearchTester {
  private readonly solidSearchContainer: HTMLElement
  private readonly user: UserEvent

  constructor(solidSearchContainer: HTMLElement, userEvent: UserEvent) {
    this.solidSearchContainer = solidSearchContainer
    this.user = userEvent
  }

  public hasSearchMode(
    searchMode: 'onKeyPressed' | 'onEnterKeyPressed',
  ): boolean {
    return (
      this.solidSearchContainer.getAttribute('data-searchmode') === searchMode
    )
  }

  public hasHorizontalAlignment(
    alignment: 'leftJustified' | 'rightJustified',
  ): boolean {
    return (
      this.solidSearchContainer.getAttribute('data-alignment') === alignment
    )
  }

  public async search(searchValue: string) {
    await this.user.click(
      within(this.solidSearchContainer).getByTestId(
        'designsystem-search-button-collapsed',
      ),
    )
    const input = within(this.solidSearchContainer).getByRole('searchbox')
    await this.user.type(input, searchValue)
    if (this.hasSearchMode('onEnterKeyPressed')) {
      await this.user.type(input, '{enter}')
    }
  }

  public async cancelSearch() {
    await this.user.click(
      within(this.solidSearchContainer).getByTestId('designsystem-cancel-button'),
    )
  }
}
