namespace SeleniumTestComponents.Components;

public class RadioGroupComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public void SelectValue(string value)
    {
        IWebElement radioElement = element.FindElement(
            By.CssSelector($".react-aria-Radio > label > input[value='{value}']")
        );

        radioElement.Click();
    }

    public bool IsSelected()
    {
        IWebElement label = this.WrappedElement.FindElement(By.ClassName("react-aria-Radio"));
        return label.GetDomAttribute("data-selected") == "true";
    }

    public string GetValue()
    {
        IWebElement label = this.WrappedElement.FindElement(By.ClassName("react-aria-Radio"));
        return label.GetDomAttribute("data-value");
    }

    public string GetLabel()
    {
        IWebElement label = this.WrappedElement.FindElement(By.ClassName("react-aria-Radio"));
        return label.GetDomAttribute("data-label");
    }
}
