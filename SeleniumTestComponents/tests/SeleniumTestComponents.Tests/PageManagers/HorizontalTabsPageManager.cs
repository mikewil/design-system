using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class HorizontalTabsPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public HorizontalTabsComponentManager HorizontalTabs =>
        new(this.Wait.Until(d => d.FindElement(By.ClassName("designsystem-HorizontalTabs"))));
}
