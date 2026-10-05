namespace SeleniumTestComponents.Components;

public class OutlineButtonComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public void Click() => this.WrappedElement.Click();
}
