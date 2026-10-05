import { UserEvent } from '@testing-library/user-event'
import { within } from '@testing-library/dom'

export class CardTester {
  private readonly cardElement: HTMLElement
  private readonly user: UserEvent

  constructor(cardElement: HTMLElement, userEvent: UserEvent) {
    this.cardElement = cardElement
    this.user = userEvent
  }

  public get title(): string | null {
    const titleElement = within(this.cardElement).queryByTestId('title')
    return titleElement ? titleElement.textContent : null
  }

  public get subtitle(): string | null {
    const subTitleElement = within(this.cardElement).queryByTestId(
      'subtitle-text',
    )
    return subTitleElement ? subTitleElement.textContent : null
  }

  public get contentTextByIndex():
    | { title: string; subtitle: string }[]
    | null {
    const contentArray = Array.from(
      within(this.cardElement).queryAllByTestId(/^card-detail-/),
    ).map((contentText) => {
      const titleElement = within(contentText).queryByTestId('header')
      const subtitleElement = within(contentText).queryByTestId('subtitle')
      const title = titleElement?.textContent || ''
      const subtitle = subtitleElement?.textContent || ''
      return { title, subtitle }
    })

    return contentArray.length > 0 ? contentArray : null
  }
  public get statusType(): string | null {
    const statusElement = within(this.cardElement).queryByTestId(
      /^status-type-/,
    )
    const status =
      statusElement?.getAttribute('data-testid')?.replace('status-type-', '') ||
      ''
    return status ? status : null
  }

  public isClickThru(): boolean {
    return within(this.cardElement).queryByTestId('click-thru-icon') !== null
  }

  public get imageContent(): HTMLElement | null {
    const imageElement = within(this.cardElement).queryByTestId('imageContent')
    return imageElement ? (imageElement as HTMLElement) : null
  }

  public get images(): HTMLElement[] {
    return Array.from(
      within(this.cardElement).queryAllByTestId(/^detail-image-/),
    )
  }
  public get customTitle(): HTMLElement | null {
    return within(this.cardElement).queryByTestId('custom-title')
  }

  public get customContent(): HTMLElement | null {
    return within(this.cardElement).queryByTestId('custom-content')
  }

  public async click() {
    await this.user.click(this.cardElement)
  }
}
