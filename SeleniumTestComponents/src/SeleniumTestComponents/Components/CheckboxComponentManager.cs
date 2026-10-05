namespace SeleniumTestComponents.Components;

public class CheckboxComponentManager(IWebElement element) : IWrapsElement
{
    public string GetState()
    {
        var classAttribute = element.GetDomAttribute("class");
        var classParts = classAttribute.Split(' ');
        return classParts[1];
    }

    public bool IsChecked => element.FindElement(By.TagName("input")).Selected;

    public bool IsDisabled => !element.FindElement(By.TagName("input")).Enabled;

    public bool IsIndeterminant =>
        element.FindElement(By.TagName("input")).GetDomAttribute("aria-checked") == "mixed";

    public void SelectCheckbox() => element.Click();

    public IWebElement WrappedElement => element;
}
