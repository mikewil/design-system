using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class SolidSearchPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public SolidSearchComponentManager SolidSearch =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector("[data-testid=designsystem-solid-search-container]"))
            )
        );

    public void Search(string searchText) => this.SolidSearch.Search(searchText);

    public void SearchThenCancel()
    {
        this.Search("Device 1");
        this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=designsystem-cancel-button]")));
        this.SolidSearch.CancelSearch();
    }
}
