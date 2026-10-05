import { within } from '@testing-library/dom'
import { UserEvent } from '@testing-library/user-event/index'

export class TextInputTester {
  private readonly element: HTMLElement
  private readonly input: HTMLInputElement
  private readonly user: UserEvent

  constructor(element: HTMLElement, userEvent: UserEvent) {
    this.element = element
    this.input = within(element).getByTestId('text-input')
    this.user = userEvent
  }

  public hasLabel(): boolean {
    return within(this.element).getByTestId('text-input-label') !== null
  }

  public hasSubLabel(): boolean {
    return within(this.element).getByTestId('text-input-sub-label') !== null
  }

  public hasPlaceholder(): boolean {
    return this.input.placeholder !== null
  }

  public hasValue(): boolean {
    return this.input.value !== '' && this.input.value !== null
  }

  public hasDescription(): boolean {
    return within(this.element).getByTestId('text-input-description') !== null
  }

  public hasErrorMessage(): boolean {
    return within(this.element).getByTestId('text-input-error-message') !== null
  }

  public get isDisabled(): boolean {
    return this.input.disabled
  }

  public get isRequired(): boolean {
    return this.input.required
  }

  public get isInvalid(): boolean {
    return this.input.getAttribute('data-invalid') === 'true'
  }

  public async enterValue(value: string) {
    await this.user.type(this.input, value)
  }

  public async clear() {
    await this.user.clear(this.input)
  }

  public async blur() {
    await this.user.tab()
  }

  public async click() {
    await this.user.click(this.input)
  }

  public async submit() {
    await this.user.type(this.input, '{enter}')
  }
}
