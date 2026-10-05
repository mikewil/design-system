using OpenQA.Selenium;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public sealed class SolidDropdownTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    private readonly Uri primaryUrl = new("components-soliddropdown--primary", UriKind.Relative);

    [Fact]
    public void SolidDropdown_TitleShouldBeTheDefaultTitleWhenNoElementsAreSelected()
    {
        var dataTestId = "e2e-example-single";

        // Arrange
        var solidDropdownPageManager = new SolidDropdownPageManager(
            webDriver,
            environmentConfig,
            dataTestId
        );
        solidDropdownPageManager.NavigateToStorybookPage(this.primaryUrl);
        solidDropdownPageManager.NavigateToSingleSelect();
        solidDropdownPageManager.SwitchToStorybookIframeContext();

        // Act
        var currentTitle = solidDropdownPageManager.SolidDropdown.GetTitle();

        // Assert
        Assert.Equal("Title", currentTitle);
        Assert.False(solidDropdownPageManager.SolidDropdown.IsOpen());
    }

    [Fact]
    public void SolidDropdown_TitleShouldUpdateToSelectedItemWhenItemIsSelected()
    {
        var dataTestId = "e2e-example-single";
        var expectedDataKeys = new List<string> { "Item 1", "Item 2", "Item 3", "Item 4" };

        // Arrange
        var solidDropdownPageManager = new SolidDropdownPageManager(
            webDriver,
            environmentConfig,
            dataTestId
        );
        solidDropdownPageManager.NavigateToStorybookPage(this.primaryUrl);
        solidDropdownPageManager.NavigateToSingleSelect();
        solidDropdownPageManager.SwitchToStorybookIframeContext();

        // Act
        solidDropdownPageManager.SolidDropdown.OpenDropdown();
        IList<string> listOptions = solidDropdownPageManager.SolidDropdown.GetElements();
        solidDropdownPageManager.SolidDropdown.SelectAnItem(dataTestId, "Item 1");
        var currentTitle = solidDropdownPageManager.SolidDropdown.GetTitle();

        // Assert
        Assert.Equal("Item 1", currentTitle);
        Assert.False(solidDropdownPageManager.SolidDropdown.IsMultiple());
        Assert.False(solidDropdownPageManager.SolidDropdown.IsOpen());
        Assert.Equal(expectedDataKeys, listOptions);
    }

    [Fact]
    public void SolidDropdown_TitleShouldUpdateToItemNumberWhenInMultiselect()
    {
        var dataTestId = "e2e-example-multiple";
        var expectedDataKeys = new List<string> { "Item 1", "Item 2", "Item 3", "Item 4" };
        var expectedSelectedKeys = new List<string> { "Item 1", "Item 3" };

        // Arrange
        var solidDropdownPageManager = new SolidDropdownPageManager(
            webDriver,
            environmentConfig,
            dataTestId
        );
        solidDropdownPageManager.NavigateToStorybookPage(this.primaryUrl);
        solidDropdownPageManager.NavigateToMultipleSelect();
        solidDropdownPageManager.SwitchToStorybookIframeContext();
        solidDropdownPageManager.SolidDropdown.OpenDropdown();
        solidDropdownPageManager.SolidDropdown.SelectAnItem(dataTestId, "Item 1");
        solidDropdownPageManager.SolidDropdown.SelectAnItem(dataTestId, "Item 2");
        solidDropdownPageManager.SolidDropdown.SelectAnItem(dataTestId, "Item 3");
        solidDropdownPageManager.SolidDropdown.SelectAnItem(dataTestId, "Item 2");

        // Act
        var currentTitle = solidDropdownPageManager.SolidDropdown.GetTitle();
        IList<string> dataKeys = solidDropdownPageManager.SolidDropdown.GetElements();
        IList<string> selectedKeys = solidDropdownPageManager.SolidDropdown.GetSelectedElements();

        // Assert
        Assert.Equal("Title (2)", currentTitle);
        Assert.True(solidDropdownPageManager.SolidDropdown.IsMultiple());
        Assert.True(solidDropdownPageManager.SolidDropdown.IsOpen());
        Assert.Equal(expectedDataKeys, dataKeys);
        Assert.Equal(expectedSelectedKeys, selectedKeys);
    }
}
