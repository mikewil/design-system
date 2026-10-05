namespace SeleniumTestComponents.Components;

public class TextInputComponentManager(IWebElement element) : IWrapsElement
{
    private IWebElement Element { get; } = element;
    private IWebElement? Input { get; } =
        element.FindElement(By.CssSelector("[data-testid='designsystem-text-input']"));

    public string? Label() =>
        this.Element.FindElement(By.CssSelector("[data-testid='designsystem-text-input-label']"))?.Text;

    public string? SubLabel() =>
        this
            .Element.FindElement(By.CssSelector("[data-testid='designsystem-text-input-sub-label']"))
            ?.Text;

    public string? Placeholder() => this.Input?.GetDomAttribute("placeholder");

    public string? Value() => this.Input?.GetDomAttribute("value");

    public string? Description() =>
        this
            .Element.FindElement(By.CssSelector("[data-testid='designsystem-text-input-description']"))
            ?.Text;

    public string? ErrorMessage() =>
        this
            .Element.FindElement(By.CssSelector("[data-testid='designsystem-text-input-error-message']"))
            ?.Text;

    public bool IsDisabled() => this.Input?.GetDomAttribute("disabled") != null;

    public bool IsRequired() => this.Input?.GetDomAttribute("required") != null;

    public bool IsInvalid() => this.Input?.GetDomAttribute("data-invalid") != null;

    public bool HasAsterisk()
    {
        ReadOnlyCollection<IWebElement>? elements = this.Element.FindElements(
            By.CssSelector("[data-testid='designsystem-text-input-asterisk']")
        );
        return elements.Count != 0;
    }

    public void EnterValue(string text) => this.Input?.SendKeys(text);

    public void Clear() => this.Input?.Clear();

    public void Blur() => this.Input?.SendKeys(Keys.Tab);

    public void Click() => this.Input?.Click();

    public void Submit() => this.Input?.Submit();

    public IWebElement WrappedElement => this.Element;
}
