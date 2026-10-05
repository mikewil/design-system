namespace SeleniumTestComponents.Components;

public class SolidSearchComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public bool HasSearchValue(string searchValue)
    {
        IWebElement searchInput = element.FindElement(By.TagName("input"));
        return searchInput.GetDomAttribute("value") == searchValue;
    }

    public void Search(string searchText)
    {
        IWebElement searchButton = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-search-button-collapsed]")
        );
        searchButton.Click();
        IWebElement input = this.WrappedElement.FindElement(By.TagName("input"));
        Thread.Sleep(600);
        input.SendKeys(searchText);
        input.SendKeys(Keys.Enter);
    }

    public void CancelSearch()
    {
        IWebElement cancelButton = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-cancel-button]")
        );
        cancelButton.Click();
    }
}
