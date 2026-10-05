using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class HorizontalTabsTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri url = new("components-tabs-horizontaltabs--primary", UriKind.Relative);

    [Fact]
    public void HorizontalTabs_ShouldDisplayTabTitle()
    {
        // Arrange
        var horizontalTabsPageManager = new HorizontalTabsPageManager(webDriver, environmentConfig);
        horizontalTabsPageManager.NavigateToStorybookPage(this.url);

        // Act
        horizontalTabsPageManager.SwitchToStorybookIframeContext();
        var activeTab = horizontalTabsPageManager.HorizontalTabs.ActiveTab();
        horizontalTabsPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("TAB 2", activeTab);
    }

    [Fact]
    public void HorizontalTabs_ShouldHaveTheCorrectNumberOfTabs()
    {
        // Arrange
        var horizontalTabsPageManager = new HorizontalTabsPageManager(webDriver, environmentConfig);
        horizontalTabsPageManager.NavigateToStorybookPage(this.url);

        // Act
        horizontalTabsPageManager.SwitchToStorybookIframeContext();
        var count = horizontalTabsPageManager.HorizontalTabs.TabCount();
        horizontalTabsPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal(3, count);
    }

    [Fact]
    public void HorizontalTabs_ActiveTabShouldShowContent()
    {
        // Arrange
        var horizontalTabsPageManager = new HorizontalTabsPageManager(webDriver, environmentConfig);
        horizontalTabsPageManager.NavigateToStorybookPage(this.url);

        // Act
        horizontalTabsPageManager.SwitchToStorybookIframeContext();
        var hasContent = horizontalTabsPageManager.HorizontalTabs.TabContent().Displayed;
        horizontalTabsPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.True(hasContent);
    }
}
