# Depends On

- [Implement Jest tester class](Write-Selenium-test-cases.md)

# Next Step

- [Implement Selenium Tester class](Implement-Jest-tester-class.md)

# Folder Structure

<pre>
design-system-react
└──src
   └──Components
      └── {ComponentName}
          └── <span style="color:#00BFFF">{ComponentName}.test.tsx</span>
</pre>

# Introduction

- IMPORTANT: Do not write jest tests until the tester has been completed
- Writing jest test for the the design system _should_ be much easier compared to Shared Components through the use of the Tester Classes

# Tests

In many ways tests are written exactly the same but with the added benifit of the tester class

```ts
it("should render the button and its text", () => {
  const testId = "designsystem-solid-button"; // Test ID is critical for writing unit tests
  const buttonText = "Test button";
  const variant = "default";
  const style = "primary";

  // Render the component normally
  render(
    <SolidButton
      testId={testId}
      buttonText={buttonText}
      variant={variant}
      style={style}
      leadingImage={Products_Sterilizer}
    ></SolidButton>
  );

  // Get the Element from Tester Class
  const buttonElement = new SolidButtonTester(screen.getByTestId(testId));

  // All comparisons come from the Tester Class
  expect(buttonElement.buttonText).toEqual(buttonText);
  expect(buttonElement.variant).toEqual(variant);
  expect(buttonElement.style).toEqual(style);
  expect(buttonElement.hasLeadingImage).toBe(true);
  expect(buttonElement.hasFollowingImage).toBe(false);
});
```
