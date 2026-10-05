using System.Collections.ObjectModel;
using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;
using SeleniumTestComponents.Tests.PageManagers;
using Xunit;

namespace SeleniumTestComponents.Tests.Tests;

public class StandardTableTest(IWebDriver webDriver, EnvironmentConfig environmentConfig)
{
    [Fact]
    public void StandardTable_GetRows_ShouldReturnRows()
    {
        // Arrange
        var standardTablePageManager = new StandardTablePageManager(webDriver, environmentConfig);
        standardTablePageManager.NavigateToStorybookPage(
            new Uri("components-standardtable-standardtablebody--infinite-scroll", UriKind.Relative)
        );

        // Act
        standardTablePageManager.SwitchToStorybookIframeContext();
        ReadOnlyCollection<StandardTableRowComponentManager> rows =
            standardTablePageManager.Table.GetRows();

        var tablesText = rows.Select(x => x.WrappedElement.Text).ToList();

        // Assert
        Assert.Equal(11, rows.Count);
        standardTablePageManager.SwitchBackToDefaultContext();
    }

    [Fact]
    public void StandardTable_GetRows_ShouldWaitForLoadingToFinish()
    {
        // Arrange
        var standardTablePageManager = new StandardTablePageManager(webDriver, environmentConfig);
        standardTablePageManager.NavigateToStorybookPage(
            new Uri("components-standardtable-standardtablebody--infinite-scroll", UriKind.Relative)
        );

        // Act
        standardTablePageManager.SwitchToStorybookIframeContext();
        standardTablePageManager.Table.WaitForLoadingToFinish();

        // Assert
        Assert.False(standardTablePageManager.Table.IsLoading);
    }

    [Fact]
    public void StandardTableRow_ShouldShowCorrectStatus()
    {
        // Arrange
        var standardTablePageManager = new StandardTablePageManager(webDriver, environmentConfig);
        standardTablePageManager.NavigateToStorybookPage(
            new Uri("components-standardtable-standardtablerow--status-rows", UriKind.Relative)
        );

        // Act
        standardTablePageManager.SwitchToStorybookIframeContext();
        ReadOnlyCollection<StandardTableRowComponentManager> rows =
            standardTablePageManager.Table.GetRows();

        // Assert
        Assert.Equal(RowStatus.None, rows[0].Status);
        Assert.Equal(RowStatus.Information, rows[1].Status);
        Assert.Equal(RowStatus.Warning, rows[2].Status);
        Assert.Equal(RowStatus.Error, rows[3].Status);
        Assert.Equal(RowStatus.Success, rows[4].Status);
    }

    [Fact]
    public void StandardTableRow_ShouldSupportGettingACellByColumnName()
    {
        // Arrange
        var standardTablePageManager = new StandardTablePageManager(webDriver, environmentConfig);
        standardTablePageManager.NavigateToStorybookPage(
            new Uri("components-standardtable-standardtablecolumn--default", UriKind.Relative)
        );

        // Act
        standardTablePageManager.SwitchToStorybookIframeContext();
        ReadOnlyCollection<StandardTableRowComponentManager> rows =
            standardTablePageManager.Table.GetRows();

        // Assert
        Assert.Equal("Data 1-2", rows[0].GetCell("Age").Text);
    }
}
