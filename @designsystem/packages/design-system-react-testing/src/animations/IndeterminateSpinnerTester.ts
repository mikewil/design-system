export class IndeterminateSpinnerTester {
  private readonly spinnerElement: HTMLElement
  private readonly spinner: SVGSVGElement | null = null

  constructor(spinnerElement: HTMLElement) {
    this.spinnerElement = spinnerElement
    this.spinner = spinnerElement.querySelector('.rotateProgressSpinner')
  }

  public get variant(): string {
    return this.spinnerElement.classList[1]
  }

  public get size(): string {
    return this.spinnerElement.classList[2]
  }

  public get width(): number {
    const widthAttr = this.spinner?.getAttribute('width')

    if (widthAttr) {
      return parseFloat(widthAttr)
    }

    const bbox = this.spinner?.getBBox()
    return bbox?.width || 0
  }

  public get height(): number {
    const heightAttr = this.spinner?.getAttribute('height')

    if (heightAttr) {
      return parseFloat(heightAttr)
    }

    const bbox = this.spinner?.getBBox()
    return bbox?.height || 0
  }
}
