# Depends on

- [Design and style the component](Design-and-style-the-component.md)

# Next Step

- [Write Jest test cases](Write-Jest-test-cases.md)

# Folder Structure

<pre>
design-system-react-testing
└──src
   └──Components
      └── <span style="color:#00BFFF">{ComponentName}.Tester.ts</span>
</pre>

# Introduction

- A reoccurring theme we've seen while developing the My DesignSystem Portal is that jest tests (unit test) are tedious, time consuming, hard to read, and often flakey. We can mitigate many of these issues by creating a Tester Class for every component
- Write this in the editor of your choice

# Creating the Tester Class

- Create a new file called {ComponentName}Tester.ts
- Define the element and its constructor
- Create a way to get every possible state of the component (title, icon, etc)
- Define how to interact with the element (Click, hover, etc)

```ts
export class {ComponentName}Tester {
    // Define the element
    private readonly {componentName}Element: HTMLElement
    private readonly user: UserEvent

    // Define the constructor
    constructor({componentName}element: HTMLElement, userEvent: UserEvent) {
        this.{componentName}Element = {componentName}Element
        this.user = userEvent
    }

    // Example
    public get title(): string | null {
        return (
            within(this.inlineNotificationElement).getByTestId('title')
                ?.textContent || null
            )
    }
}

```

# index.ts

- Add your tester to src/index.ts

```js
import {{ComponentName}Tester.tsx} from ./path/to/tester
export {{ComponentName}}
```
