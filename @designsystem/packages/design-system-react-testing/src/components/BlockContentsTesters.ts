import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event'

export class BlockContentsTester {
  private readonly blockContents: HTMLElement
  private readonly user: UserEvent

  constructor(blockContents: HTMLElement, userEvent: UserEvent) {
    this.blockContents = blockContents
    this.user = userEvent
  }

  public hasHeader(header: string): boolean {
    return (
      within(this.blockContents).getByTestId('designsystem-block-contents-header')
        .textContent === header
    )
  }

  public hasText(text: string): boolean {
    return (
      within(this.blockContents).getByTestId('designsystem-block-contents-text')
        .textContent === text
    )
  }

  public hasActionLink(link?: string): boolean {
    if (!link) {
      return false
    }
    const actionLink = within(this.blockContents).queryByRole('link')
    if (actionLink) {
      return actionLink.getAttribute('href') === link
    }
    return false
  }

  public hasLayout(
    layout: 'head' | 'details' | 'headAction' | 'detailsAction',
  ): boolean {
    return this.blockContents.getAttribute('data-layout') === layout
  }

  public hasBadge(): boolean {
    return within(this.blockContents).queryByTestId('badge') !== null
  }

  public async clickButton() {
    const button = within(this.blockContents).queryByTestId(
      'designsystem-block-contents-edit-button',
    )
    if (button) {
      await this.user.click(button)
    } else {
      throw new Error('Button not found!')
    }
  }
}
