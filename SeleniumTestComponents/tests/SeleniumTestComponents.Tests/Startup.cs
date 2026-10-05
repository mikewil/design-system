using System.Reflection;
using MartinCostello.BrowserStack.Automate;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using SeleniumTestComponents.Tests.Configs;
using Xunit.DependencyInjection;

namespace SeleniumTestComponents.Tests;

public class Startup
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage(
        "Performance",
        "CA1822:Mark members as static",
        Justification = "Required for dependency injection framework"
    )]
    public void ConfigureServices(IServiceCollection services)
    {
        // Retrieves the environment name set in the system's environment variables.
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        // Initializes a new instance of the ConfigurationBuilder class.
        IConfigurationBuilder builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(AppContext.BaseDirectory)) // Sets the base path for the configuration files.
            .AddJsonFile("appsettings.json", optional: false) // Adds the main appsettings.json file.
            .AddJsonFile($"appsettings.{env}.json", optional: true) // Adds the environment-specific appsettings file.
            .AddJsonFile("testsettings.json", optional: true) // Adds the main testsettings.json file.
            .AddJsonFile($"testsettings.{env}.json", optional: true) // Adds the environment-specific testsettings file.
            .AddEnvironmentVariables(); // Adds environment variables to the configuration.

        // Builds the configuration and returns it.
        IConfigurationRoot builtConfig = builder.Build();

        var environmentConfig = new EnvironmentConfig();
        builtConfig.GetSection("EnvironmentConfig").Bind(environmentConfig);
        services.AddSingleton(environmentConfig);

        if (
            Environment.GetEnvironmentVariable("BROWSERSTACK_USERNAME") != null
            && Environment.GetEnvironmentVariable("BROWSERSTACK_ACCESS_KEY") != null
        )
        {
            ConfigureBrowserStackWebDriver(services);
            services.AddScoped<BeforeAfterTest, BrowserStackSessionManager>();
            services.AddScoped(sp => new BrowserStackAutomateClient(
                Environment.GetEnvironmentVariable("BROWSERSTACK_USERNAME")!,
                Environment.GetEnvironmentVariable("BROWSERSTACK_ACCESS_KEY")!
            ));
        }
        else
        {
            ConfigureLocalWebDriver(services);
        }
    }

    private static void ConfigureLocalWebDriver(IServiceCollection services) =>
        services.AddScoped<IWebDriver>(s =>
        {
            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArgument("--allow-file-access-from-files");
            var storybookPath = new Uri(
                $"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/../storybook-static/index.html"
            );
            var driver = new ChromeDriver(chromeOptions);
            driver.Navigate().GoToUrl(storybookPath);
            return driver;
        });

    private static void ConfigureBrowserStackWebDriver(IServiceCollection services) =>
        services.AddScoped<IWebDriver>(
            (sp) =>
            {
                var storybookHost = new Uri(Environment.GetEnvironmentVariable("STORYBOOK_HOST")!);

                DriverOptions capabilities = new ChromeOptions();

                // The URL here should be dynamically updated by the BrowserStack SDK if it is installed correctly.
                var driver = new RemoteWebDriver(
                    new Uri($"http://if-you-see-this-browserstack-sdk-is-not-set-up-properly.com"),
                    capabilities
                );

                driver.Navigate().GoToUrl(storybookHost);
                driver.Manage().Window.Maximize();
                return driver;
            }
        );
}
