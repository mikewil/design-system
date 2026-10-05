using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class TextInputPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public TextInputComponentManager TextInput =>
        new(this.Wait.Until(d => d.FindElement(By.ClassName("designsystem-TextInput"))));

    internal void ToggleIsRequired()
    {
        this.SetControlsTab();
        IWebElement toggle = this.Wait.Until(d => d.FindElement(By.Id("control-isRequired")));
        toggle.Click();
    }

    private void SetControlsTab() =>
        this.Wait.Until(d => d.FindElement(By.Id("tabbutton-addon-controls"))).Click();
}
