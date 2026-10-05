using OpenQA.Selenium;
using SeleniumTestComponents.Components;
using SeleniumTestComponents.Tests.Configs;

namespace SeleniumTestComponents.Tests.PageManagers;

public class RadioGroupPageManager(IWebDriver webDriver, EnvironmentConfig environmentConfig)
    : StorybookBasePageManager(webDriver, environmentConfig)
{
    public RadioGroupComponentManager RadioGroup =>
        new(
            this.Wait.Until(d => d.FindElement(By.CssSelector("[data-testid=designsystem-radiogroup]")))
        );

    internal void SetDisabledVariant()
    {
        this.Wait.Until(d => d.FindElement(By.Id("tabbutton-addon-controls"))).Click();
        IWebElement variantCheckbox = this.Wait.Until(d =>
            d.FindElement(By.CssSelector($"ul[class*=\"not-collapsed-list\"] > div:first-of-type"))
        );
        variantCheckbox.Click();

        IWebElement disabledState = this.Wait.Until(d =>
            d.FindElement(By.XPath($"//span[text()='false']"))
        );
        disabledState.Click();

        IWebElement hiddenInput = this.Wait.Until(d =>
            d.FindElement(By.CssSelector("input[value='false']"))
        );
        hiddenInput.SendKeys("true");
        variantCheckbox.Click();
    }
}
