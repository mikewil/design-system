using OpenQA.Selenium.Support.UI;

namespace SeleniumTestComponents.Components;

public class StandardTableComponentManager(IWebElement webElement, IWebDriver webDriver)
    : IWrapsElement
{
    private readonly WebDriverWait webDriverWait = new(webDriver, TimeSpan.FromSeconds(10));
    private readonly ReadOnlyCollection<IWebElement> headers = webElement.FindElements(
        By.TagName("th")
    );

    public IWebElement WrappedElement => webElement;

    public void SortByColumn(string columnName)
    {
        IWebElement header =
            this.headers.FirstOrDefault(x => x.Text == columnName)
            ?? throw new ColumnNotFoundException($"Column with name {columnName} not found");

        if (header.GetDomAttribute("data-sortable") == "false")
        {
            throw new InvalidOperationException($"Column {columnName} is not sortable");
        }

        header.Click();
    }

    public bool IsLoading => webElement.GetDomAttribute("data-isLoading") is not null and "true";

    public void WaitForLoadingToFinish()
    {
        IWebElement tbody = webElement.FindElement(By.TagName("tbody"));

        this.webDriverWait.Until(driver =>
            tbody.GetDomAttribute("data-isLoading")?.Equals("false") ?? true
        );
    }

    public ReadOnlyCollection<StandardTableRowComponentManager> GetRows()
    {
        this.WaitForLoadingToFinish();
        return webElement
            .FindElement(By.TagName("tbody"))
            .FindElements(By.TagName("tr"))
            .Select(x => new StandardTableRowComponentManager(x, this.headers))
            .ToList()
            .AsReadOnly();
    }
}
