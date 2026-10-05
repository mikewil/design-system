export class TextTester {
  private readonly element: HTMLElement

  constructor(element: HTMLElement) {
    this.element = element
  }

  public get variant(): string {
    return this.element.getAttribute('data-variant') || 'body-1-low-emphasis'
  }

  public get style(): string {
    return this.element.getAttribute('data-style') || 'primary'
  }

  public get isInline(): boolean {
    return this.element.getAttribute('data-isinline') === 'true'
  }

  public get tagName(): string {
    return this.element.tagName
  }

  public get textContent(): string | null {
    return this.element.textContent?.trim() || null
  }
}
