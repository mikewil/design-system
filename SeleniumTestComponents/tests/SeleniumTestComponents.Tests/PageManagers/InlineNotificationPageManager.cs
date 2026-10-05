using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class InlineNotificationPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public InlineNotificationComponentManager InlineNotification =>
        new(this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=designsystem-inline-notification]"))));
}
