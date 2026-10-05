using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class OutlineButtonPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public OutlineButtonComponentManager OutlineButton =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector("[data-testid=designsystem-outline-button]"))
            )
        );

    public IWebElement ButtonClickedText =>
        this.Wait.Until(d =>
            d.FindElement(By.CssSelector("[data-testid=storybook-button-clicked]"))
        );
}
