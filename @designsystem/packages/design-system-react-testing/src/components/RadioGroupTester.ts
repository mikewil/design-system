import { UserEvent } from '@testing-library/user-event'
import { within } from '@testing-library/dom'

export class RadioGroupTester {
  private readonly radioGroupElement: HTMLElement
  private readonly user: UserEvent

  constructor(radioGroupElement: HTMLElement, userEvent: UserEvent) {
    this.radioGroupElement = radioGroupElement
    this.user = userEvent
  }

  public get radioButtons(): HTMLInputElement[] {
    const radioButtonElements = within(this.radioGroupElement).getAllByRole(
      'radio',
    )
    return Array.from(radioButtonElements) as HTMLInputElement[]
  }

  public getRadioButtonByValue(value: string): HTMLInputElement | undefined {
    return this.radioButtons.find((radioButton) => radioButton.value === value)
  }

  public isSelected(value: string): boolean {
    const radioButton = this.getRadioButtonByValue(value)
    if (!radioButton)
      throw new Error(`RadioButton with value '${value}' not found`)
    return radioButton.checked
  }

  public get selectedRadioButton(): HTMLInputElement | undefined {
    return this.radioButtons.find((radioButton) => radioButton.checked)
  }

  public isDisabled(value: string): boolean {
    const radioButton = this.getRadioButtonByValue(value)
    if (!radioButton)
      throw new Error(`RadioButton with value '${value}' not found`)
    return radioButton.disabled
  }

  public async select(value: string) {
    const radioButton = this.getRadioButtonByValue(value)
    if (!radioButton)
      throw new Error(`RadioButton with value '${value}' not found`)
    await this.user.click(radioButton)
  }
}
