using System.Reflection;
using MartinCostello.BrowserStack.Automate;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using Xunit.Abstractions;
using Xunit.DependencyInjection;

namespace SeleniumTestComponents.Tests;

public class BrowserStackSessionManager(
    IWebDriver webDriver,
    BrowserStackAutomateClient browserStackAutomateClient,
    ITestOutputHelperAccessor testOutputHelperAccessor
) : BeforeAfterTest
{
    private readonly ITestOutputHelper outputHelper = testOutputHelperAccessor.Output!;

    public override async ValueTask BeforeAsync(
        object? testClassInstance,
        MethodInfo methodUnderTest
    )
    {
        var sessionId = ((RemoteWebDriver)webDriver).SessionId.ToString();
        Session sessionDetails = (await browserStackAutomateClient.GetSessionAsync(sessionId))!;

        this.outputHelper.WriteLine($"BrowserStack Session: {sessionDetails.BrowserUrl}");
    }
}
