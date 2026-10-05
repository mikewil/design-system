# Percy Visual Regression Testing

We use [Percy Storybook](https://www.npmjs.com/package/@percy/storybook) and
Percy's [integration with Azure DevOps](https://www.browserstack.com/docs/percy/source-code-integrations/azure-devops) to
perform visual regression and acceptance testing with the design team.

The tool shows a visual diff of changes to the design team and asks for approval.

To run the tool locally you can log into https://percy.io and set [your percy token](https://percy.io/420762e8/DesignSystem/settings) in your environment
variable.

Once that's set you can run the command:

```pwsh
npm run percy
```

## Interaction with the pipelines

-   **We run percy as part of the CI** - To validate that any visual changes in a PR have been approved by design
-   **We run percy every time we merge to master** - To update the baseline accepted snapshots
