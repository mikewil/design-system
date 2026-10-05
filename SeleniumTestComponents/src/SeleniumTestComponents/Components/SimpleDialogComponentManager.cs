namespace SeleniumTestComponents.Components;

public class SimpleDialogComponentManager(IWebElement element) : IWrapsElement
{
    public IWebElement WrappedElement => element;

    public string Heading()
    {
        IWebElement heading = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-header]")
        );

        return heading.Text;
    }

    public string Content()
    {
        IWebElement content = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-content]")
        );

        return content.Text;
    }

    public string ConfirmText()
    {
        IWebElement button = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-confirm-button]")
        );

        return button.Text;
    }

    public string CancelText()
    {
        IWebElement button = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-cancel-button]")
        );

        return button.Text;
    }

    public void Confirm()
    {
        IWebElement button = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-confirm-button]")
        );

        button.Click();
    }

    public void Cancel()
    {
        IWebElement button = this.WrappedElement.FindElement(
            By.CssSelector("[data-testid=designsystem-dialog-cancel-button]")
        );

        button.Click();
    }
}
