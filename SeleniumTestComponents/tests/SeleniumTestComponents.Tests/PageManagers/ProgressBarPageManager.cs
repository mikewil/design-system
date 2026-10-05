using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class ProgressBarPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public ProgressBarComponentManager ProgressBar =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector("[data-testid=designsystem-progress-bar]"))
            )
        );
}
