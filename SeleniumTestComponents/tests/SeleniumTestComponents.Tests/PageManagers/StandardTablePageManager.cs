using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class StandardTablePageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    private readonly IWebDriver webDriver = webDriver;

    public StandardTableComponentManager Table =>
        new(
            this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=table]"))),
            this.webDriver
        );
}
