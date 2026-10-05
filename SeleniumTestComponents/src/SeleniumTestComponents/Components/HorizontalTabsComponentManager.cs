namespace SeleniumTestComponents.Components;

public class HorizontalTabsComponentManager(IWebElement element) : IWrapsElement
{
    private IWebElement Element { get; } = element;

    public IWebElement WrappedElement => this.Element;

    public int? TabCount() => this.Element.FindElements(By.CssSelector("[role='tab']"))?.Count;

    public string? ActiveTab() =>
        this.Element.FindElement(By.CssSelector("[aria-selected='true']"))?.Text;

    public IWebElement TabContent() =>
        this.Element.FindElement(By.CssSelector("[role='tabpanel']"));
}
