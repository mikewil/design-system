using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class RadioGroupTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-radiogroup--default", UriKind.Relative);

    [Fact]
    public void RadioGroup_OptionOne_ShouldShowSelectedWhenClicked()
    {
        // Arrange
        var radioGroupManager = new RadioGroupPageManager(webDriver, environmentConfig);
        radioGroupManager.NavigateToStorybookPage(this.primaryUrl);
        radioGroupManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.False(radioGroupManager.RadioGroup.IsSelected());

        radioGroupManager.RadioGroup.SelectValue("option1");

        Assert.True(radioGroupManager.RadioGroup.IsSelected());
    }

    [Fact]
    public void RadioGroup_OptionOne_ShouldShowDisabled()
    {
        // Arrange
        var radioGroupManager = new RadioGroupPageManager(webDriver, environmentConfig);
        radioGroupManager.NavigateToStorybookPage(this.primaryUrl);
        radioGroupManager.SetDisabledVariant();
        radioGroupManager.SwitchToStorybookIframeContext();

        // Act and assert
        Assert.False(radioGroupManager.RadioGroup.IsSelected());

        radioGroupManager.RadioGroup.SelectValue("option1");

        Assert.False(radioGroupManager.RadioGroup.IsSelected());
    }
}
