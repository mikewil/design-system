namespace SeleniumTestComponents.Components;

public class ProgressBarComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public string? Title() => this.WrappedElement.Text;

    public string? Progress() => this.WrappedElement.GetDomAttribute("data-percentage");

    public string? Type() => this.WrappedElement.GetDomAttribute("data-bar-type");
}
