export class RoundedButtonTester {
  private readonly buttonElement: HTMLElement

  constructor(buttonElement: HTMLElement) {
    this.buttonElement = buttonElement
  }

  public get state(): string {
    return this.buttonElement.classList[1]
  }

  public get hasText(): string {
    return this.buttonElement.classList[2]
  }

  public get buttonText(): string | null {
    return this.buttonElement.textContent?.trim() || null
  }

  public get isDisabled(): boolean {
    return this.buttonElement.classList.contains('disabled')
  }

  public get isInProgress(): boolean {
    return this.buttonElement.classList.contains('progress')
  }

  public get hasImage(): boolean {
    return (
      this.buttonElement.querySelector('[data-testid=buttonImage]') !== null
    )
  }

  public get hasBadge(): boolean {
    return this.buttonElement.querySelector('[data-testid=badge]') !== null
  }
}
