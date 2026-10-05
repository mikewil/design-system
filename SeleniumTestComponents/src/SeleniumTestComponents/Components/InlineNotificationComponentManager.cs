namespace SeleniumTestComponents.Components;

public class InlineNotificationComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;
    public string? Title()
    {
        ReadOnlyCollection<IWebElement> titleElement = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=title]")
        );
        return titleElement.Count > 0 ? titleElement[0].Text : null;
    }

    public string? Text() {
        ReadOnlyCollection<IWebElement> titleElement = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=text]")
        );
        return titleElement.Count > 0 ? titleElement[0].Text : null;
    }

    public string? ActionLinkTest() {
        ReadOnlyCollection<IWebElement> titleElement = this.WrappedElement.FindElements(
            By.CssSelector("[data-testid=actionLink]")
        );
        return titleElement.Count > 0 ? titleElement[0].Text : null;
    }

    public bool HasLeftHeader() => this.WrappedElement.FindElements(By.CssSelector("[data-testid='leftHeader']")).Count > 0;

    public string NotificationLevel() => this.WrappedElement.GetDomAttribute("data-level");
    public void ClickCloseIcon() => this.WrappedElement.FindElement(By.CssSelector("[data-testid='closeIcon']")).Click();
    public void ClickActionLink() => this.WrappedElement.FindElement(By.CssSelector("[data-testid='actionLink']")).Click();
}
