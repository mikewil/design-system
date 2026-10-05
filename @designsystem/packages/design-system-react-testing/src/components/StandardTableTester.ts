import { UserEvent } from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'

class StandardTableRow {
  constructor(
    private rowElement: HTMLElement,
    private user: UserEvent,
    private headerCells: string[],
  ) {}

  async click(): Promise<void> {
    await this.user.click(this.rowElement)
  }

  getStatus(): 'Warning' | 'Error' | 'Success' | 'Information' | 'None' | null {
    // Status is indicated by a data-status attribute
    return this.rowElement.getAttribute('data-status') as unknown as
      | 'Warning'
      | 'Error'
      | 'Success'
      | 'Information'
      | 'None'
      | null
  }

  getCell(columnName: string): HTMLElement {
    const columnIndex = this.headerCells.indexOf(columnName)
    if (columnIndex === -1) {
      throw new Error(`Column "${columnName}" not found`)
    }

    const cells = this.rowElement.getElementsByTagName('td')
    return cells[columnIndex] as HTMLElement
  }
}

export class StandardTableTester {
  private headerCells: string[] = []

  constructor(
    private user: UserEvent,
    private rootElement: HTMLElement,
  ) {
    // Cache header cell text for column lookups
    const headers = rootElement.getElementsByTagName('th')
    this.headerCells = Array.from(headers).map((h) => h.textContent || '')
  }

  async getRows(): Promise<StandardTableRow[]> {
    const tbody = this.rootElement.getElementsByTagName('tbody')[0]
    await waitFor(() => tbody.getAttribute('data-isloading') === 'false')
    const rows = tbody.getElementsByTagName('tr')

    return Array.from(rows)
      .filter((row) => !row.classList.contains('observerRow')) // Filter out loading observer row
      .map((row) => new StandardTableRow(row, this.user, this.headerCells))
  }

  async triggerSort(columnName: string): Promise<void> {
    const headers = this.rootElement.getElementsByTagName('th')
    const header = Array.from(headers).find((h) =>
      h.textContent?.includes(columnName),
    )

    if (!header) {
      throw new Error(`Column "${columnName}" not found`)
    }

    if (!header.getAttribute('data-sortable')) {
      throw new Error(`Column "${columnName}" is not sortable`)
    }

    await this.user.click(header)
  }

  async waitForLoadingToFinish(): Promise<void> {
    const tbody = this.rootElement.getElementsByTagName('tbody')[0]
    if (
      tbody.getAttribute('data-isLoading') === 'false' &&
      tbody.getAttribute('data-hasmore') === 'false'
    ) {
      return
    }

    await waitFor(() => tbody.getAttribute('data-isLoading') === 'false')
  }
}
