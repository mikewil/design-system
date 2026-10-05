using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class TextInputTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri emptyUrl = new("components-textinput--empty", UriKind.Relative);
    private readonly Uri enteredUrl = new("components-textinput--entered", UriKind.Relative);
    private readonly Uri errorUrl = new("components-textinput--error", UriKind.Relative);
    private readonly Uri lockedUrl = new("components-textinput--locked", UriKind.Relative);

    [Fact]
    public void TextInput_ShouldShowLabelWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var label = textInputPageManager.TextInput.Label();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("TITLE", label);
    }

    [Fact]
    public void TextInput_ShouldShowSubLabelWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var subLabel = textInputPageManager.TextInput.SubLabel();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("Subtitle", subLabel);
    }

    [Fact]
    public void TextInput_ShouldShowAsteriskWhenRequired()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var hasAsterisk = textInputPageManager.TextInput.HasAsterisk();
        var isRequired = textInputPageManager.TextInput.IsRequired();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.True(hasAsterisk);
        Assert.True(isRequired);
    }

    [Fact]
    public void TextInput_ShouldNotShowAsteriskWhenNotRequired()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.ToggleIsRequired();
        textInputPageManager.SwitchToStorybookIframeContext();
        var hasAsterisk = textInputPageManager.TextInput.HasAsterisk();
        var isRequired = textInputPageManager.TextInput.IsRequired();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.False(hasAsterisk);
        Assert.False(isRequired);
    }

    [Fact]
    public void TextInput_ShouldShowDescriptionWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var description = textInputPageManager.TextInput.Description();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("Assistive Text", description);
    }

    [Fact]
    public void TextInput_ShouldShowPlaceholderWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var placeholder = textInputPageManager.TextInput.Placeholder();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("Example Text", placeholder);
    }

    [Fact]
    public void TextInput_ShouldShowValueWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.enteredUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var value = textInputPageManager.TextInput.Value();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("Example Text", value);
    }

    [Fact]
    public void TextInput_ShouldShowErrorMessageWhenSet()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.errorUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var errorMessage = textInputPageManager.TextInput.ErrorMessage();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.Equal("This field is required", errorMessage);
    }

    [Fact]
    public void TextInput_ShouldBeDisabled()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.lockedUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var isDisabled = textInputPageManager.TextInput.IsDisabled();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.True(isDisabled);
    }

    [Fact]
    public void TextInput_ShouldNotBeDisabled()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var isDisabled = textInputPageManager.TextInput.IsDisabled();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.False(isDisabled);
    }

    [Fact]
    public void TextInput_ShouldBeInvalid()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.errorUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var isInvalid = textInputPageManager.TextInput.IsInvalid();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.True(isInvalid);
    }

    [Fact]
    public void TextInput_ShouldNotBeInvalid()
    {
        // Arrange
        var textInputPageManager = new TextInputPageManager(webDriver, environmentConfig);
        textInputPageManager.NavigateToStorybookPage(this.emptyUrl);

        // Act
        textInputPageManager.SwitchToStorybookIframeContext();
        var isInvalid = textInputPageManager.TextInput.IsInvalid();
        textInputPageManager.SwitchBackToDefaultContext();

        // Assert
        Assert.False(isInvalid);
    }
}
