using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class ProgressBarTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-progressbar--primary", UriKind.Relative);

    [Fact]
    public void ShouldShowTitleSubtitleAndSubHeaders()
    {
        // Arrange
        var progressBarPageManager = new ProgressBarPageManager(webDriver, environmentConfig);
        progressBarPageManager.NavigateToStorybookPage(this.primaryUrl);
        progressBarPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Progress Text (units)", progressBarPageManager.ProgressBar.Title());
        Assert.Equal("50", progressBarPageManager.ProgressBar.Progress());
        Assert.Equal("information", progressBarPageManager.ProgressBar.Type());
    }
}
