using OpenQA.Selenium;

namespace SeleniumTestComponents.Tests.ExtensionMethods;

public static class IWebDriverExtensions
{
    public static void NavigateToRelativePath(this IWebDriver webDriver, string relativePath) =>
        webDriver.Navigate().GoToUrl(new Uri($"{webDriver.Url}{relativePath}"));
}
