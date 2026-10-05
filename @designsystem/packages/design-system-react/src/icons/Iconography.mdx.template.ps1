$ScriptDirectory = $PSScriptRoot

$IconNames = Get-ChildItem $ScriptDirectory/generated-icons | Select-Object -ExpandProperty BaseName
$Template = Get-Content $ScriptDirectory/Iconography.mdx.template

$IconNamesGroupedByNamespace = $IconNames | ForEach-Object { 
    [pscustomobject]@{ Name = $_; Namespace = $_.split('_')[0] }
} | Group-Object Namespace | Sort-Object Name


$IconItemsString = [System.Text.StringBuilder]::new()

foreach($Namespace in $IconNamesGroupedByNamespace) {
    $IconItemsString.AppendLine("### $($Namespace.Name)") | Out-Null
    $IconItemsString.AppendLine("") | Out-Null
    $IconitemsString.AppendLine("<IconGallery>") | Out-Null
    foreach($Icon in $Namespace.Group) {
        $IconItemsString.AppendLine("    <IconItem name=`"$($Icon.Name.split('_')[1])`">") | Out-Null
        $IconItemsString.AppendLine("        <$($Icon.Name) />") | Out-Null
        $IconItemsString.AppendLine("    </IconItem>") | Out-Null
    }
    $IconitemsString.AppendLine("</IconGallery>") | Out-Null
    $IconItemsString.AppendLine("") | Out-Null
}

$Template = $Template -replace 'ICON_IMPORTS', ($IconNames -join ', ')
$Template = $Template -replace 'ICON_ITEMS', $IconItemsString.ToString()

$Template | Out-File $ScriptDirectory/Iconography.mdx -Encoding utf8