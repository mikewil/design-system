using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class InlineNotificationTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-inlinenotification--primary", UriKind.Relative);
    private readonly string primaryInlineNotification = "components-inlinenotification--primary";
    private readonly string secondaryInlineNotification = "components-inlinenotification--warning";

    [Fact]
    public void ShouldShowTitleTextActionLink()
    {
        // Arrange
        var inlineNotificationPageManager = new InlineNotificationPageManager(webDriver, environmentConfig);
        inlineNotificationPageManager.NavigateToStorybookPage(this.primaryUrl);
        inlineNotificationPageManager.NavigateToComponentVariant(this.primaryInlineNotification);
        inlineNotificationPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Inline Title", inlineNotificationPageManager.InlineNotification.Title());
        Assert.Equal("We need to make", inlineNotificationPageManager.InlineNotification.Text());
        Assert.Equal("Action Link", inlineNotificationPageManager.InlineNotification.ActionLinkTest());
        Assert.False(inlineNotificationPageManager.InlineNotification.HasLeftHeader());
        Assert.Equal("information", inlineNotificationPageManager.InlineNotification.NotificationLevel());
    }

    [Fact]
    public void ShouldShowLeftHeader() {
        // Arrange
        var inlineNotificationPageManager = new InlineNotificationPageManager(webDriver, environmentConfig);
        inlineNotificationPageManager.NavigateToStorybookPage(this.primaryUrl);
        inlineNotificationPageManager.NavigateToComponentVariant(this.secondaryInlineNotification);
        inlineNotificationPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("WARNING", inlineNotificationPageManager.InlineNotification.Title());
        Assert.Equal("We need to make", inlineNotificationPageManager.InlineNotification.Text());
        Assert.Equal("Action Link", inlineNotificationPageManager.InlineNotification.ActionLinkTest());
        Assert.True(inlineNotificationPageManager.InlineNotification.HasLeftHeader());
        Assert.Equal("safety-warning", inlineNotificationPageManager.InlineNotification.NotificationLevel());
    }
}
