namespace SeleniumTestComponents.Tests.Exceptions;

public class EnvironmentVariableNotFoundException : Exception
{
    public EnvironmentVariableNotFoundException()
        : base() { }

    public EnvironmentVariableNotFoundException(string environmentVariableName)
        : base($"The environment variable '{environmentVariableName}' not specified") =>
        this.EnvironmentVariableName = environmentVariableName;

    public EnvironmentVariableNotFoundException(
        string environmentVariableName,
        Exception innerException
    )
        : base(
            $"The environment variable '{environmentVariableName}' not specified",
            innerException
        ) { }

    public string EnvironmentVariableName { get; }
}
