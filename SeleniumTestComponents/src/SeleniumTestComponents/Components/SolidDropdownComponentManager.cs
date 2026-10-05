using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace SeleniumTestComponents.Components;

public class SolidDropdownComponentManager(
    IWebElement wrappedElement,
    IWebDriver webDriver,
    string dataTestId
)
{
    public string GetTitle()
    {
        IWebElement titleText = wrappedElement.FindElement(
            By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-select-value']")
        );
        return titleText.Text.Trim();
    }

    public bool IsMultiple()
    {
        ReadOnlyCollection<IWebElement> multipleSelectElements = wrappedElement.FindElements(
            By.CssSelector(
                $".multiple-select[data-testid='{dataTestId}-solid-dropdown-select-value']"
            )
        );
        return multipleSelectElements.Count > 0;
    }

    public bool OpenDropdown()
    {
        try
        {
            IWebElement dropdownButton = wrappedElement.FindElement(
                By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-select-value']")
            );
            dropdownButton.Click();
            return true;
        }
        catch (NoSuchElementException)
        {
            return false;
        }
    }

    public bool IsOpen()
    {
        try
        {
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(1));
            wait.Until(
                ExpectedConditions.ElementIsVisible(
                    By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-listbox']")
                )
            );
            return true;
        }
        catch (WebDriverTimeoutException)
        {
            return false;
        }
    }

    public IList<string> GetElements()
    {
        if (!this.IsOpen())
        {
            this.OpenDropdown();
        }

        var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(1));
        IWebElement selectionListBox = wait.Until(
            ExpectedConditions.ElementIsVisible(
                By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-listbox']")
            )
        );

        ReadOnlyCollection<IWebElement> elementsWithDataKey = selectionListBox.FindElements(
            By.CssSelector("[data-key]")
        );
        var dataKeys = new List<string>();

        foreach (IWebElement? element in elementsWithDataKey)
        {
            var dataKey = element.GetDomAttribute("data-key");
            if (!string.IsNullOrEmpty(dataKey))
            {
                dataKeys.Add(dataKey);
            }
        }

        return dataKeys;
    }

    public IList<string> GetSelectedElements()
    {
        if (!this.IsOpen())
        {
            this.OpenDropdown();
        }

        if (!this.IsMultiple())
        {
            throw new InvalidOperationException(
                "GetSelectedElements is only valid for multiple select"
            );
        }

        var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(1));
        IWebElement selectionListBox = wait.Until(
            ExpectedConditions.ElementIsVisible(
                By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-listbox']")
            )
        );

        ReadOnlyCollection<IWebElement> elementsWithDataKey = selectionListBox.FindElements(
            By.CssSelector("[data-key]")
        );
        var selectedDataKeys = new List<string>();

        foreach (IWebElement? element in elementsWithDataKey)
        {
            var classNames = element.GetDomAttribute("class");
            if (!string.IsNullOrEmpty(classNames) && classNames.Contains("selected"))
            {
                var dataKey = element.GetDomAttribute("data-key");
                if (!string.IsNullOrEmpty(dataKey))
                {
                    selectedDataKeys.Add(dataKey);
                }
            }
        }
        return selectedDataKeys;
    }

    public bool SelectAnItem(string dataTestId, string itemName)
    {
        try
        {
            // Wait for the dropdown list to be visible
            var wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(10));
            IWebElement dropdownList = wait.Until(
                ExpectedConditions.ElementIsVisible(
                    By.CssSelector($"[data-testid='{dataTestId}-solid-dropdown-listbox']")
                )
            );

            // Locate the dropdown item by its text content
            IWebElement dropdownItem = dropdownList.FindElement(
                By.CssSelector($"[data-testid='{itemName}-clickable-div']")
            );
            dropdownItem.Click();
            Thread.Sleep(50); // 50 ms delay to wait for debouncing on the web app
            return true;
        }
        catch (NoSuchElementException)
        {
            return false;
        }
    }
}
