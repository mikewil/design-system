using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class CheckboxPageManager(
    IWebDriver webDriver,
    EnvironmentConfig environmentConfig,
    string dataTestId
) : StorybookBasePageManager(webDriver, environmentConfig)
{
    private readonly IWebDriver webDriver = webDriver;
    private readonly string dataTestId = dataTestId;

    public CheckboxComponentManager Checkbox =>
        new(
            this.Wait.Until(d =>
                this.webDriver.FindElement(By.CssSelector($"[data-testid='{this.dataTestId}']"))
            )
        );
}
