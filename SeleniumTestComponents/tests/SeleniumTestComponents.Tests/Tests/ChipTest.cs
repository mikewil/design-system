using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class ChipTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-buttons-chip--primary", UriKind.Relative);
    private readonly Uri noIconUrl = new("components-buttons-chip--no-icon", UriKind.Relative);
    private readonly Uri multipleUrl = new("components-buttons-chip--multiple", UriKind.Relative);

    [Fact]
    public void ChipShouldShowSelectedWhenClicked()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.primaryUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.False(chipPageManager.Chip.IsSelected);

        chipPageManager.Chip.Click();

        Assert.True(chipPageManager.Chip.IsSelected);
    }

    [Fact]
    public void ChipShouldShowIconWhenPresent()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.primaryUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.True(chipPageManager.Chip.HasIcon);
    }

    [Fact]
    public void ChipShouldNotShowIconWhenNotPresent()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.noIconUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.False(chipPageManager.Chip.HasIcon);
    }

    [Fact]
    public void ChipShouldShowText()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.primaryUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.Equal("Button", chipPageManager.Chip.Text);
    }

    [Fact]
    public void ChipShouldShowSingleVariant()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.primaryUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.Equal("single", chipPageManager.Chip.Variant);
    }

    [Fact]
    public void ChipShouldShowMultipleVariant()
    {
        // Arrange
        var chipPageManager = new ChipPageManager(webDriver, environmentConfig);
        chipPageManager.NavigateToStorybookPage(this.multipleUrl);
        chipPageManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.Equal("multiple", chipPageManager.Chip.Variant);
    }
}
