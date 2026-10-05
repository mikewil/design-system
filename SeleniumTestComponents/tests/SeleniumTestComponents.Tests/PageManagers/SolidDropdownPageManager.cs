using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class SolidDropdownPageManager(
    IWebDriver webDriver,
    EnvironmentConfig environmentConfig,
    string dataTestId
) : StorybookBasePageManager(webDriver, environmentConfig)
{
    private readonly IWebDriver webDriver = webDriver;
    private readonly string dataTestId = dataTestId;

    public SolidDropdownComponentManager SolidDropdown =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector($"[data-testid='{this.dataTestId}-solid-dropdown']"))
            ),
            this.webDriver,
            this.dataTestId
        );

    public void NavigateToSingleSelect() =>
        this.GetStorybookContol(
                By.CssSelector("[data-item-id=components-soliddropdown--test-e-2-e-single")
            )
            .Click();

    public void NavigateToMultipleSelect() =>
        this.GetStorybookContol(
                By.CssSelector("[data-item-id=components-soliddropdown--test-e-2-e-multiple")
            )
            .Click();
}
