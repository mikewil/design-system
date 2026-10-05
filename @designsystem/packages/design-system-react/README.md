# @designsystem/design-system-react

A collection of React components that align to the DesignSystem Design 5 Portal Pattern

# Libraries

## Husky

This project uses husky to run commands before commits/pushes
pre-commit will prettier your code

## Prettier

This project uses prettier to maintain consistent styles.
The husky pre-commit will run prettier on all files before your code get committed.

## Jest

This project uses jest as its testing framework
The package.json has rules to force 80% code coverage

## Storybook

Steps to getting this project running locally:

1. Run `npm install` (Do not run `npm audit fix` after)
2. Run `npm run storybook` to launch storybook and begin developing your components

### Testing changes locally

Ideally, you will build unit tests and use Storybook to test the majority of
your changes. In the scenario where you need to test your changes locally
inside another project and do not want to publish a new version to npm you can:

1. Run `npm pack` - This will generate a tarball file of the code from this module
2. Go to your project where this module is being used and run `npm install <path-to-tarball>` - This will install the module into your project from the
   tarball directly instead of using npm.
3. After testing your changes locally, you will need to delete the package-lock.json file that is pointing to the tarball file, as well as the node-modules
   folder. Then re-run `npm i` after updating to the new shared-components library version stored in DevOps.

## Setup

### 1. Connect npm to the Azure DevOps

Create the following `.npmrc` file adjacent to your `package.json` file:

#### If your project is in DesignSystemEnterpriseSharedServices

```text
@designsystem-enterprise:registry=https://pkgs.dev.azure.com/DesignSystemEnterpriseSharedServices/_packaging/DesignSystemEnterpriseSharedServices%40Local/npm/registry/
@designsystem-enterprise:always-auth=true
```

#### If your project is in DesignSystem

```text
@designsystem-enterprise:registry=https://pkgs.dev.azure.com/DesignSystem/_packaging/DesignSystem/npm/registry
@designsystem-enterprise:always-auth=true
```

#### Windows Users

Run the following command to authenticate with Azure DevOps:

```sh
npx vsts-npm-auth -config ./.npmrc
```

### 2. Install the package

Run the following command:

```sh
npm i @designsystem/design-system-react --save
```

## Usage

```js
import { ButtonWithProgress } from @designsystem/design-system-react;
function App() {
   return (
      <ButtonWithProgress inProgress={true} />
   )
}
```

# !Super Important!

## Webpack on import module

By default webpack treats ALL org packages as external. So when you install this package (or any non external @designsystem/ package) you will get the error:`Error: Unable to resolve bare specifier '@designsystem/design-system-react' from https://localhost:9600/designsystem-mechanical-room-page.js`

To fix this ...

```js
// webpack.config.js
const defaultConfig = singleSpaDefaults({
   orgName: 'designsystem',
   orgPackagesAsExternal: false, // <-- Add this line to not treat @designsystem/ packages as external
   projectName: 'mechanical-room-page',
   webpackConfigEnv,
   argv,
})
...
    externals: [
      'single-spa',
      'single-spa-react',
      'react',
      'react-dom',
      'react-query',
      'i18next',
      'react-i18next',
      '@designsystem/auth-utility',   // <-- Manually add each package that you want to treat as external. NOT @designsystem/design-system-react
      '@designsystem/query-client-utility',
      '@designsystem/feature-flag-utility',
      '@designsystem/mark-as-complete-dialog',
      '@designsystem/product-routine-care-page',
      '@designsystem/product-care-maintenance-page',
    ],
```

When you add `orgPackagesAsExternal: false` you will get a bunch of errors that look like

```sh
ERROR in ./src/components/mechanical-room-tabs.tsx 85:17-65
Module not found: Error: Can't resolve '@designsystem/product-care-maintenance-page' in 'C:\Users\<user>\Documents\Projects\DesignSystem.Web.DesignSystemPortal.Telemetry\mechanical-room-page\src\components'
```

These are the package you need to add to you 'external'
