using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public class SolidSearchTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl =
        new("components-search-solidsearch--search-on-key-pressed", UriKind.Relative);

    [Fact]
    public void SolidSearch_Search()
    {
        // Arrange
        var searchValue = "Device1";
        var solidSearchPageManager = new SolidSearchPageManager(webDriver, environmentConfig);
        solidSearchPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        solidSearchPageManager.SwitchToStorybookIframeContext();
        solidSearchPageManager.Search(searchValue);

        // Assert
        Assert.True(solidSearchPageManager.SolidSearch.HasSearchValue(searchValue));
        solidSearchPageManager.SwitchBackToDefaultContext();
    }

    [Fact]
    public void SolidSearch_CancelSearch()
    {
        // Arrange
        var solidSearchPageManager = new SolidSearchPageManager(webDriver, environmentConfig);
        solidSearchPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        solidSearchPageManager.SwitchToStorybookIframeContext();
        solidSearchPageManager.SearchThenCancel();

        // Assert
        Assert.True(solidSearchPageManager.SolidSearch.HasSearchValue(string.Empty));
        solidSearchPageManager.SwitchBackToDefaultContext();
    }
}
