using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class SolidButtonPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public SolidButtonComponentManager SolidButton =>
        new(
            this.Wait.Until(d =>
                d.FindElement(By.CssSelector("[data-testid=designsystem-solid-button]"))
            )
        );

    public bool Progress
    {
        get
        {
            this.Wait.Until(d => d.FindElement(By.CssSelector(".docblock-argstable span")));

            if (this.WebDriver.FindElements(By.Id("set-progress")).Count == 1)
            {
                return false;
            }

            return this.WebDriver.FindElement(By.Id("control-progress")).Selected;
        }
        set
        {
            this.Wait.Until(d => d.FindElement(By.CssSelector(".docblock-argstable span")));

            if (this.WebDriver.FindElements(By.Id("set-progress")).Count == 1)
            {
                this.GetStorybookContol(By.Id("set-progress")).Click();
            }

            if (this.WebDriver.FindElement(By.Id("control-progress")).Selected != value)
            {
                this.GetStorybookContol(By.Id("control-progress")).Click();
            }
        }
    }

    internal void SetSolidButtonVariant(string variant)
    {
        this.Wait.Until(d => d.FindElement(By.Id("tabbutton-addon-controls"))).Click();
        IWebElement variantCheckbox = this.Wait.Until(d =>
            d.FindElement(By.CssSelector($"input[type='radio'][value='{variant}']"))
        );
        variantCheckbox.Click();
    }
}
