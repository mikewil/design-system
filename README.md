# DesignSystem

This is a monorepo holding all projects related to connected solutions implementation
and support of the [Design System](https://designsystem.sharepoint.com/teams/DesignandHumanFactors/DesignSystem)

## Projects

- [@designsystem/design-system-react](./@designsystem/design-system-react/) - An npm package containing the React component implementations of the Design System shared components
- [@designsystem/design-system-react-testing](./@designsystem/design-system-react-testing/) - An npm package designed to make testing `@designsystem/design-system-react`
  with React Testing Library easy
- [DesignSystem.SeleniumTestComponents](./DesignSystem.SeleniumTestComponents/) - A nuget package designed to make testing
  UIs built using `@designsystem/design-system-react` components easy in Selenium

# How to make a new component

- Create the component and all of its states as defined in Figma
- Implement CSS Modules
- Create a jest tester component
- Write Jest tests
- Connect to Figma via Code Connect
- Configure Figma
- Publish the NPM package

## Log into Figma

The design team uses figma to create a library of components and the designs for the web app

- Log into the [Figma Design System](https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25912&node-type=frame&m=dev)
- Find the component you want to build

## Adobe React Aria

We use react-aria as the foundation of our design system components. It is a headless UI Library. For more information on why it was selected see this wiki [Headless UI Library for React-based Component System](https://dev.azure.com/DesignSystem/DesignSystem/_wiki/wikis/DesignSystem.wiki/2572/Headless-UI-Library-for-React-based-Component-System)

- Navigate to [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
- Find the component(s) that most closely match the one from the design

## Figma Code Connect

We use Figma Code connect to publish our code to the figma design system. For an incredible amount of details see [Figma Code Connect - The Comprehensive Guide](https://dev.azure.com/DesignSystem/DesignSystem/_wiki/wikis/DesignSystem.wiki/2634/Figma-Code-Connect-The-Comprehensive-Guide)

- `npx figma connect`
- `npx figma connect create --token <auth_token> "{component_url}"`
- `npx figma publish`

### Error: 'Failed to fetch components ... self-signed cert'

See the aforementioned Figma Code Connect Guide
