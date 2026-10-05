using OpenQA.Selenium;
using OpenQA.Selenium.Support.Extensions;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public abstract class StorybookBasePageManager
{
    private protected StorybookBasePageManager(
        IWebDriver webDriver,
        EnvironmentConfig environmentConfig
    )
    {
        this.WebDriver = webDriver;
        this.Wait = new WebDriverWait(
            webDriver,
            TimeSpan.FromSeconds(environmentConfig.WaitForElementInSeconds)
        );
    }

    public IWebDriver WebDriver { get; }

    public WebDriverWait Wait { get; }

    public void NavigateToStorybookPage(Uri url)
    {
        this.Wait.Until(ExpectedConditions.ElementExists(By.Id("storybook-explorer-tree")));

        var relativeUrl = new Uri(
            new Uri(this.WebDriver.Url),
            new Uri("?path=/story/" + url, UriKind.Relative)
        );

        this.WebDriver.Navigate().GoToUrl(relativeUrl);

        this.Wait.Until(
            ExpectedConditions.ElementExists(By.CssSelector("#storybook-preview-wrapper>iframe"))
        );

        this.Wait.Until(ExpectedConditions.ElementExists(By.CssSelector("#storybook-panel-root")));
    }

    public void NavigateToComponentVariant(string dataItemId) =>
        this.Wait.Until(d => d.FindElement(By.CssSelector($"[data-item-id={dataItemId}"))).Click();

    public IWebElement GetStorybookContol(By selector)
    {
        IWebElement element = this.Wait.Until(ExpectedConditions.ElementToBeClickable(selector));
        this.WebDriver.ExecuteJavaScript("arguments[0].scrollIntoView(true);", element);
        Thread.Sleep(TimeSpan.FromMilliseconds(200));
        return element;
    }

    public void SwitchToStorybookIframeContext()
    {
        IWebElement iframe = this.WebDriver.FindElement(
            By.CssSelector("#storybook-preview-wrapper>iframe")
        );

        this.WebDriver.SwitchTo().Frame(iframe);
    }

    public void SwitchBackToDefaultContext() => this.WebDriver.SwitchTo().DefaultContent();
}
