using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public class OutlineButtonTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl =
        new("components-buttons-outlinebutton--default", UriKind.Relative);

    [Fact]
    public void OutlineButton_ShouldClickButton()
    {
        // Arrange
        var outlineButtonPageManager = new OutlineButtonPageManager(webDriver, environmentConfig);
        outlineButtonPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        outlineButtonPageManager.SwitchToStorybookIframeContext();
        outlineButtonPageManager.OutlineButton.Click();

        // Assert
        IWebElement buttonClickedText = outlineButtonPageManager.ButtonClickedText;
        Assert.NotNull(buttonClickedText);
    }
}
