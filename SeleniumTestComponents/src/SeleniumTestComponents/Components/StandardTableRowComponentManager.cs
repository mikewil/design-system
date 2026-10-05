namespace SeleniumTestComponents.Components;

public class StandardTableRowComponentManager(
    IWebElement webElement,
    ReadOnlyCollection<IWebElement> headers
) : IWrapsElement
{
    public IWebElement WrappedElement => webElement;

    public void Click() => webElement.Click();

    public RowStatus? Status =>
        Enum.TryParse(
            webElement.GetDomAttribute("data-status"),
            ignoreCase: true,
            out RowStatus status
        )
            ? status
            : null;

    public IWebElement GetCell(string columnName)
    {
        var index =
            headers
                .Select((x, i) => new { x.Text, i })
                .FirstOrDefault(x => x.Text.Equals(columnName, StringComparison.OrdinalIgnoreCase))
                ?.i
            ?? throw new ColumnNotFoundException($"Column with name {columnName} not found");
        return webElement.FindElements(By.TagName("td"))[index];
    }
}
