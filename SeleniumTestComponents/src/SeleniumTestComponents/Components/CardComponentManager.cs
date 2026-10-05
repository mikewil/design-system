namespace SeleniumTestComponents.Components;

public class CardComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public void Click() => this.WrappedElement.Click();

    public string? Title()
    {
        ReadOnlyCollection<IWebElement> titleElement = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=title]")
        );
        return titleElement.Count > 0 ? titleElement[0].Text : null;
    }

    public string? SubTitle()
    {
        ReadOnlyCollection<IWebElement> subtitleElement = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=subtitle-text]")
        );
        return subtitleElement.Count > 0 ? subtitleElement[0].Text : null;
    }

    public IList<(string title, string subtitle)>? ContentTextByIndex()
    {
        ReadOnlyCollection<IWebElement> contentElements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid^=card-detail-]")
        );
        var contentList = new List<(string title, string subtitle)>();

        foreach (IWebElement contentElement in contentElements)
        {
            IWebElement titleElement = contentElement.FindElement(
                By.CssSelector("[data-testid=header]")
            );
            IWebElement subtitleElement = contentElement.FindElement(
                By.CssSelector("[data-testid=subtitle]")
            );
            var title = titleElement?.Text ?? string.Empty;
            var subtitle = subtitleElement?.Text ?? string.Empty;
            contentList.Add((title, subtitle));
        }

        return contentList.Count != 0 ? contentList : null;
    }

    public string? StatusType()
    {
        ReadOnlyCollection<IWebElement> statusElements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid^=status-type-]")
        );
        if (statusElements.Count == 0)
        {
            return null;
        }
        var status = statusElements[0]?.GetDomAttribute("data-testid")?.Replace("status-type-", "");
        return string.IsNullOrEmpty(status) ? null : status;
    }

    public bool? IsClickThru() =>
        this.WrappedElement.FindElements(By.CssSelector("[data-testid=click-thru-icon]")).Count
        != 0;

    public IWebElement? ImageContent()
    {
        ReadOnlyCollection<IWebElement> elements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=imageContent]")
        );
        return elements.Count > 0 ? elements[0] : null;
    }

    public IList<IWebElement>? Images()
    {
        ReadOnlyCollection<IWebElement> elements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid^=detail-image-]")
        );
        return elements.Count == 0 ? null : elements;
    }

    public IWebElement? CustomTitle()
    {
        ReadOnlyCollection<IWebElement> elements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=custom-title]")
        );
        return elements.Count == 0 ? null : elements[0];
    }

    public IWebElement? CustomContent()
    {
        ReadOnlyCollection<IWebElement> elements = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=custom-content]")
        );
        return elements.Count == 0 ? null : elements[0];
    }
}
