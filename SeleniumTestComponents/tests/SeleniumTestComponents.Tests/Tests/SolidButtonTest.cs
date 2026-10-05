using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class SolidButtonTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl =
        new("components-buttons-solidbutton--primary", UriKind.Relative);

    [Fact]
    public void SolidButton_IsInProgressShouldBeTrueWhenButtonIsInProgress()
    {
        // Arrange
        var solidButtonPageManager = new SolidButtonPageManager(webDriver, environmentConfig);
        solidButtonPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        solidButtonPageManager.SetSolidButtonVariant("primary");
        solidButtonPageManager.Progress = true;
        solidButtonPageManager.SwitchToStorybookIframeContext();
        var isSolidButtonInProgress = solidButtonPageManager.SolidButton.IsInProgress();
        solidButtonPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.True(isSolidButtonInProgress);
    }

    [Fact]
    public void SolidButton_IsInProgressShouldBeFalseWhenButtonIsNotInProgress()
    {
        // Arrange
        var solidButtonPageManager = new SolidButtonPageManager(webDriver, environmentConfig);
        solidButtonPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        solidButtonPageManager.SetSolidButtonVariant("primary");
        solidButtonPageManager.Progress = false;
        solidButtonPageManager.SwitchToStorybookIframeContext();
        var isSolidButtonInProgress = solidButtonPageManager.SolidButton.IsInProgress();
        solidButtonPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.False(isSolidButtonInProgress);
    }
}
