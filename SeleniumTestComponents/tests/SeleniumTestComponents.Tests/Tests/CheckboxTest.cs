using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class CheckboxTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-checkbox--primary", UriKind.Relative);
    private readonly Uri secondaryUrl = new("components-checkbox--disabled", UriKind.Relative);

    [Fact]
    public void CheckBox_ShouldDisplayDefaultState()
    {
        var dataTestId = "designsystem-checkbox";

        // Arrange
        var checkboxPageManager = new CheckboxPageManager(webDriver, environmentConfig, dataTestId);
        checkboxPageManager.NavigateToStorybookPage(this.primaryUrl);
        checkboxPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.False(checkboxPageManager.Checkbox.IsChecked);
        Assert.False(checkboxPageManager.Checkbox.IsDisabled);
        Assert.False(checkboxPageManager.Checkbox.IsIndeterminant);
    }

    [Fact]
    public void CheckBox_ShouldDisplayEachPossibleState()
    {
        var dataTestId = "designsystem-checkbox";

        // Arrange
        var checkboxPageManager = new CheckboxPageManager(webDriver, environmentConfig, dataTestId);
        checkboxPageManager.NavigateToStorybookPage(this.primaryUrl);
        checkboxPageManager.SwitchToStorybookIframeContext();

        // Act
        var checkboxInitialState = checkboxPageManager.Checkbox.IsChecked;
        checkboxPageManager.Checkbox.SelectCheckbox();
        var checkBoxFirstState = checkboxPageManager.Checkbox.IsChecked;
        checkboxPageManager.Checkbox.SelectCheckbox();
        var checkboxSecondState = checkboxPageManager.Checkbox.IsIndeterminant;
        checkboxPageManager.Checkbox.SelectCheckbox();
        var checkboxFinalState = checkboxPageManager.Checkbox.IsChecked;

        // Assert
        Assert.False(checkboxInitialState);
        Assert.True(checkBoxFirstState);
        Assert.True(checkboxSecondState);
        Assert.False(checkboxFinalState);
    }

    [Fact]
    public void CheckBox_ShouldBeDisabledIfDisabled()
    {
        var dataTestId = "designsystem-checkbox-disabled";

        // Arrange
        var checkboxPageManager = new CheckboxPageManager(webDriver, environmentConfig, dataTestId);
        checkboxPageManager.NavigateToStorybookPage(this.secondaryUrl);
        checkboxPageManager.SwitchToStorybookIframeContext();

        // Act
        var checkboxInitialState = checkboxPageManager.Checkbox.IsDisabled;
        checkboxPageManager.Checkbox.SelectCheckbox();
        var checkBoxFinalState = checkboxPageManager.Checkbox.IsDisabled;

        // Assert
        Assert.True(checkboxInitialState);
        Assert.True(checkBoxFinalState);
    }
}
