# Depends on

- Nothing! This is the first step

# Next Step

- [Implement Jest tester class](Implement-Jest-tester-class.md)
- [Write Storybook story](Write-Storybook-story.md)

# Folder Structure

<pre>
design-system-react
└──src
   └──Components
      └── <span style="color:#00BFFF">{ComponentName}</span>
          ├── <span style="color:#00BFFF">{ComponentName}.tsx</span>
          └── <span style="color:#00BFFF">{ComponentName}.module.css</span>
</pre>

# React Aria

- React Aria is a headless UI library. To understand why it was chosen, please refer to [Headless UI Library for React-based Component System](https://dev.azure.com/DesignSystem/DesignSystem/_wiki/wikis/DesignSystem.wiki/2572/Headless-UI-Library-for-React-based-Component-System)
- Before starting work on a new component, visit the [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) page to find a headless component that closely matches your requirements. This will give you a baseline component with most of the functionality already implemented.
  - You may discover that a sufficiently simple component can and should be created using pure HTML.
- Your **{ComponentName}.tsx** should now look like this

```ts
import { Button } from "react-aria-components";

export function SolidButton({}) {
  return <Button />;
}
```

# Determine your props

- Select the component in [Figma](https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=0-25912&node-type=frame&m=dev) then click **Open in Playground**
- In the top right you will see the props/controls defined by the design team.
- You should attempt to match your props to what is defined in figma as much as is reasonably possible. This will make the [Integrate with Figma Code Connect](https://dev.azure.com/DesignSystem/DesignSystem/_wiki/wikis/DesignSystem.wiki/3207/Integrate-with-Figma-Code-Connect) much easier

  ![image.png](.attachments\image-641939ce-7e10-4c17-9164-272697a49b5d.png)

```ts
import { Button } from "react-aria-components";

type SolidButtonProps = {
  // Always nice to define properties in a type
  buttonText?: string;
  variant?: "default" | "progress" | "disabled" | "hover-state"; // Explicitly define every property from the design
  style?: "primary" | "secondary";
  leadingImage?: FC<IconPropsWithoutChildren>; // This is how you define icons, more on this later
  followingImage?: FC<IconPropsWithoutChildren>;

  // Include javascript docs for every prop

  /**
   * The function to be called when the chip is clicked.
   *
   * @example
   * onClick: () => {}
   */
  onClick?: () => void;
} & BaseComponentProps;

export function SolidButton({
  // Every components needs a testId
  testId,

  // Props defined in Figma
  variant = "default",
  style = "primary",
  followingImage: FollowingImage,
  leadingImage: LeadingImage,

  // Props not defined in Figma, but are still necessary
  buttonText,
  onClick,

  ...otherProps
}: SolidButtonProps) {
  return <Button data-testid={testid} />;
}
```

# Add to index.js

- Super important step that's easy to miss!
- in src/index.ts add your component

```js
import {{ComponentName}} from ./path/to/component
export {{ComponentName}}
```

# Style the Component

- Components are styled using pure css. Do NOT use SASS, tailwind, MUI, or any other styling library, this will break the webpack and your styles will not show up in the deployed code.

# Styling with ClassName

- Use **clsx** and **getClass** when applying styles

```ts
ComponentName.tsx

import clsx from 'clsx'
import { getClass } from '../../../utils/classMaps'
import styles from './SolidButton.module.css' // The css module for the component

return(
    <Button
        className={clsx(getClass(styles, 'css_style')}, // The CSS Selector you want to apply
        testId,
    )}/>
)
```

# {ComponentName}.module.css

- All styles (and animations for now) should be controlled from this file, inline styles should be avoided unless absolutely necessary
- You can generally get the styling from [Figma Design](https://www.figma.com/design/MkgpIgyPyIYr0oodbPa4cf/DesignSystem?node-id=10785-16448&node-type=symbol&m=dev) by clicking on a specific component variant
- You can copy/paste these into your css file. \*\*There may be some small variations in spelling
  ![image.png](/.attachments/image-24eefd13-3b1f-445e-8a51-2be61196f9b9.png)

```ts
@import './../../../theme.css'; // Remember to import theme

.componentName {
    color: var(--color-neutrals-0); // Get all colors, spacings, etc from theme.css
}

```

# theme.css

- You should never have to define any color, spacing, shadow, etc this is all handled in theme.css
- All styles in this file are determined by the design team

```css
:root {
    --color-primary-0: #175788;
    --color-primary-100: #093762;

    ...

    --spacing-spacing-0: 2px;
    --spacing-spacing-1: 4px;
}
```

# Animations

- For now use pure CSS
- We may define an animation library to use in the future
