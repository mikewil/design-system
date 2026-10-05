# Depends On

- [Design and style the component](Design-and-style-the-component.md)

# Next Step

- [Implement Selenium Tester class](Implement-Selenium-Tester-class.md)

# Folder Structure

<pre>
design-system-react
└──src
   └──Components
      └── {ComponentName}
          └── <span style="color:#00BFFF">{ComponentName}.stories.tsx</span>
</pre>

# Introduction

- [Storybook](https://storybook.js.org/) creates an environment where we can view and interact with the components as we create them
- Story book is used for E2E testing
- We deploy an instance of storybook for developers/designers/stakeholders to see what components exist. https://consol-design-system.designsystem.com/?path=/docs/styling--docs
  ![image.png](.attachments\image-c0581a59-ddfa-4242-85a5-8a34d572e3ba.png)

# The storybook story

```js
import type { Meta, StoryObj } from '@storybook/react'
import { RoundedButton } from './RoundedButton'
import { Products_Sterilizer } from '../../../icons'

// Needed for every component
const meta: Meta<typeof RoundedButton> = {
    component: RoundedButton,
}
export default meta
type Story = StoryObj<typeof RoundedButton>

// You MUST define a test id for C# tests to work
const testId = "designsystem-rounded-button"

// For each different variant you want to display in storybook
export const Primary: Story = {
    args: {
        // Define all props to pass into your component
        testId: {testId}
        state: 'default',
        buttonImage: Products_Sterilizer,
        buttonText: 'Button',
        onClick: () => {
            alert('Button clicked')
        },
    },
}

// You can define as many stories as you like
export const Secondary: Story = {
    args: {
       ...
    },
}
```
