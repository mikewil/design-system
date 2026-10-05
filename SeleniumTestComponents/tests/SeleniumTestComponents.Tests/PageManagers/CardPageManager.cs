using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class CardPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public CardComponentManager Card =>
        new(this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=designsystem-card]"))));
}
