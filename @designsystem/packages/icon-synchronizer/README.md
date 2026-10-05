# Synchronize Icons Script

This script auto-generates icons from Figma.

## Usage

1. Get a [figma token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) with the `File Content:Read-Only` scope

2. Run the following command in this folder

```
npm run start -- --token <figma_token> --outputFolder <output_folder>
```

## Adjusting the template

The code the svg is injected into can be found in the `synchronize-icons.js` file.
You can modify it to be jsx/tsx or whatever code you need.
