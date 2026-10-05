export class ProgressBarTester {
  private readonly progressBarElement: HTMLElement

  constructor(progressBarElement: HTMLElement) {
    this.progressBarElement = progressBarElement
  }

  public get title(): string | null {
    return this.progressBarElement?.textContent || null
  }

  public get progress(): string | null {
    return this.progressBarElement?.getAttribute('data-percentage')
  }

  public get type(): string | null {
    return this.progressBarElement?.getAttribute('data-bar-type')
  }
}
