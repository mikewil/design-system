param (
    [Parameter(Mandatory=$false)][string]$localNugetPath
 )

 if($localNugetPath.length -eq 0){
     $path = $env:DESIGN_SYSTEM_LOCAL_NUGET_PATH
 }
 else {
    $path = $localNugetPath
 }

 $versionSuffix = Get-Date -UFormat %s

 dotnet pack -c Release /p:PackageVersion="$version-$versionSuffix" -o $path 