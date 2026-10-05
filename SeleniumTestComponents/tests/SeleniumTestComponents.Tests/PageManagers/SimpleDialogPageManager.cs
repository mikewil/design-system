using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class SimpleDialogPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    private readonly IWebDriver webDriver1 = webDriver;

    public SimpleDialogComponentManager SimpleDialog =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector("[data-testid=designsystem-simple-dialog]"))
            )
        );

    public string Heading() => this.SimpleDialog.Heading();

    public string Content() => this.SimpleDialog.Content();

    public string ConfirmText() => this.SimpleDialog.ConfirmText();

    public string CancelText() => this.SimpleDialog.CancelText();

    public void Confirm() => this.SimpleDialog.Confirm();

    public void Cancel() => this.SimpleDialog.Cancel();

    public void OpenDialog() =>
        this
            .Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=open-dialog-button]")))
            .Click();

    public bool IsClosed() =>
        this.webDriver1.FindElements(By.CssSelector("[data-testid=designsystem-simple-dialog]")).Count
        == 0;
}
