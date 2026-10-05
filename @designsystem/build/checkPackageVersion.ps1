$package = Get-Content .\package.json | ConvertFrom-Json
$packageName = $package.name

$publishedVersions = & npm view $packageName versions --json --registry https://pkgs.dev.azure.com/MidmarkDigitalEcosystem/_packaging/Midmark.Deco/npm/registry/

if ($null -eq $publishedVersions -or $publishedVersions -eq "[]" ) {
    Write-Warning "No published versions found. This may be the first time you're publishing this package"
    exit 0
}

function ParseVersion($version) {
    if ($version -is [string]) {
        $parts = $version.Split('.')
        return @{
            Major = [int]$parts[0]
            Minor = [int]$parts[1]
            Patch = [int]$parts[2]
        }
    } else {
        throw "Expected a string, but got a $($version.GetType().Name)"
    }
}

$publishedVersionsArray = $publishedVersions | ConvertFrom-Json | ForEach-Object { $_.ToString() }
$publishedVersion = $publishedVersionsArray | ForEach-Object { ParseVersion $_ } | Sort-Object -Property Major, Minor, Patch -Descending | Select-Object -First 1

$versionToPublish = ParseVersion $package.version

if ($versionToPublish.Major -lt $publishedVersion.Major -or ($versionToPublish.Major -eq $publishedVersion.Major -and $versionToPublish.Minor -lt $publishedVersion.Minor) -or ($versionToPublish.Major -eq $publishedVersion.Major -and $versionToPublish.Minor -eq $publishedVersion.Minor -and $versionToPublish.Patch -le $publishedVersion.Patch)) {
    throw "[$($package.version)] is less than or equal to the currently published version [$($publishedVersion.Major).$($publishedVersion.Minor).$($publishedVersion.Patch)]. Please update the version in your package.json"
}