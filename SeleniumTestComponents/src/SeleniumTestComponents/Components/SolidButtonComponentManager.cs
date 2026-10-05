namespace SeleniumTestComponents.Components;

public class SolidButtonComponentManager(IWebElement element) : IWrapsElement
{
    public bool IsInProgress()
    {
        ReadOnlyCollection<IWebElement> spinners = element.FindElements(By.CssSelector(".spinner"));
        return spinners.Count > 0;
    }

    public IWebElement WrappedElement => element;
}
