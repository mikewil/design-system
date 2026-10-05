using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class CardTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-card--primary", UriKind.Relative);
    private readonly string primaryCard = "components-card--primary";
    private readonly string imagesCard = "components-card--images";
    private readonly string subTitleCard = "components-card--sub-title";
    private readonly string customContent = "components-card--custom-content";

    // private readonly string noArgs = "components-card--no-arguments";
    [Fact]
    public void ShouldShowTitleSubtitleAndSubHeaders()
    {
        // Arrange
        var cardPageManager = new CardPageManager(webDriver, environmentConfig);
        cardPageManager.NavigateToStorybookPage(this.primaryUrl);
        cardPageManager.NavigateToComponentVariant(this.primaryCard);
        cardPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Title", cardPageManager.Card.Title());
        Assert.Equal("Subtitle", cardPageManager.Card.SubTitle());
        Assert.Equal("Success", cardPageManager.Card.StatusType());
        Assert.True(cardPageManager.Card.IsClickThru());
    }

    [Fact]
    public void ShouldShowTitleAndImages()
    {
        // Arrange
        var cardPageManager = new CardPageManager(webDriver, environmentConfig);
        cardPageManager.NavigateToStorybookPage(this.primaryUrl);
        cardPageManager.NavigateToComponentVariant(this.imagesCard);
        cardPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Title", cardPageManager.Card.Title());
        Assert.Equal("Subtitle", cardPageManager.Card.SubTitle());
        Assert.Null(cardPageManager.Card.StatusType());
        Assert.False(cardPageManager.Card.IsClickThru());
        Assert.Null(cardPageManager.Card.ImageContent());
        Assert.Equal(6, cardPageManager.Card.Images().Count);
    }

    [Fact]
    public void ShouldShowTitleButNoContent()
    {
        // Arrange
        var cardPageManager = new CardPageManager(webDriver, environmentConfig);
        cardPageManager.NavigateToStorybookPage(this.primaryUrl);
        cardPageManager.NavigateToComponentVariant(this.subTitleCard);
        cardPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Title", cardPageManager.Card.Title());
        Assert.Equal("Subtitle", cardPageManager.Card.SubTitle());
        Assert.Null(cardPageManager.Card.StatusType());
        Assert.False(cardPageManager.Card.IsClickThru());
        Assert.Null(cardPageManager.Card.Images());
        Assert.Null(cardPageManager.Card.ContentTextByIndex());
    }

    [Fact]
    public void ShouldShowCustomContent()
    {
        // Arrange
        var cardPageManager = new CardPageManager(webDriver, environmentConfig);
        cardPageManager.NavigateToStorybookPage(this.primaryUrl);
        cardPageManager.NavigateToComponentVariant(this.customContent);
        cardPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Null(cardPageManager.Card.Title());
        Assert.Null(cardPageManager.Card.SubTitle());
        Assert.True(
            cardPageManager
                .Card.CustomTitle()
                ?.Text.Contains("Lorem ipsum", StringComparison.Ordinal)
        );
        Assert.True(
            cardPageManager
                .Card.CustomContent()
                ?.Text.Contains("Lorem ipsum", StringComparison.Ordinal)
        );
    }
}
