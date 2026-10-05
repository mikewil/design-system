using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public class SimpleDialogTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl =
        new("components-dialogs-simpledialog--primary", UriKind.Relative);

    [Fact]
    public void SimpleDialog_DialogDisplaysOk()
    {
        // Arrange
        var simpleDialogPageManager = new SimpleDialogPageManager(webDriver, environmentConfig);
        simpleDialogPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        simpleDialogPageManager.SwitchToStorybookIframeContext();

        // Assert
        Assert.Equal("Dialog Title", simpleDialogPageManager.SimpleDialog.Heading());
        Assert.Equal("This is basic text content.", simpleDialogPageManager.SimpleDialog.Content());
        Assert.Equal("Okay", simpleDialogPageManager.SimpleDialog.ConfirmText());
        Assert.Equal("Cancel", simpleDialogPageManager.SimpleDialog.CancelText());
        simpleDialogPageManager.SwitchBackToDefaultContext();
    }

    [Fact]
    public void SimpleDialog_ClickingConfirmClosesDialog()
    {
        // Arrange
        var simpleDialogPageManager = new SimpleDialogPageManager(webDriver, environmentConfig);
        simpleDialogPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        simpleDialogPageManager.SwitchToStorybookIframeContext();
        simpleDialogPageManager.SimpleDialog.Confirm();

        // Assert
        Assert.True(simpleDialogPageManager.IsClosed());
        simpleDialogPageManager.SwitchBackToDefaultContext();
    }

    [Fact]
    public void SimpleDialog_ClickingCancelClosesDialog()
    {
        // Arrange
        var simpleDialogPageManager = new SimpleDialogPageManager(webDriver, environmentConfig);
        simpleDialogPageManager.NavigateToStorybookPage(this.primaryUrl);

        // Act
        simpleDialogPageManager.SwitchToStorybookIframeContext();
        simpleDialogPageManager.SimpleDialog.Cancel();

        // Assert
        Assert.True(simpleDialogPageManager.IsClosed());
        simpleDialogPageManager.SwitchBackToDefaultContext();
    }
}
