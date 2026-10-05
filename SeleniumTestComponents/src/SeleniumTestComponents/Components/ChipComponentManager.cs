namespace SeleniumTestComponents.Components;

public class ChipComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public string Text => this.WrappedElement.Text;

    public bool HasText => !string.IsNullOrWhiteSpace(this.Text);

    public bool IsSelected => this.WrappedElement.GetDomAttribute("aria-pressed") == "true";

    public void Click() => this.WrappedElement.Click();

    public string Variant => this.WrappedElement.GetDomAttribute("data-variant");

    public bool HasIcon =>
        this.WrappedElement.FindElements(By.CssSelector($"[data-testid='chip-icon']")).Count > 0;
}
