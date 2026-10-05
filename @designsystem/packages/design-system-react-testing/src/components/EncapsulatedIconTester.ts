export class EncapsulatedIconTester {
  private readonly iconElement: HTMLElement

  constructor(iconElement: HTMLElement) {
    this.iconElement = iconElement
  }

  public hasSize(size: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'): boolean {
    return this.iconElement.className.includes(`iconContainerSize${size}`)
  }
}
