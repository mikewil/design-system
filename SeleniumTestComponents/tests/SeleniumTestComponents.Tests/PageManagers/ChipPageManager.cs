using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class ChipPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public ChipComponentManager Chip =>
        new(this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=designsystem-chip]"))));
}
