# @shadcn-svelte/primitives

Unstyled, accessible primitives for Svelte.

## Questionnaire

```svelte
<script lang="ts">
  import * as Questionnaire from "@shadcn-svelte/primitives/questionnaire";
</script>

<Questionnaire.Root>
  <Questionnaire.Progress />
  <Questionnaire.Item name="direction" required>
    <Questionnaire.Title>What should we build?</Questionnaire.Title>
    <Questionnaire.Choices>
      <Questionnaire.Choice value="dashboard">
        <Questionnaire.ChoiceInput />
        <Questionnaire.ChoiceLabel>Dashboard</Questionnaire.ChoiceLabel>
      </Questionnaire.Choice>
    </Questionnaire.Choices>
    <Questionnaire.Error />
  </Questionnaire.Item>
  <Questionnaire.Next>Next</Questionnaire.Next>
  <Questionnaire.Submit>Submit</Questionnaire.Submit>
</Questionnaire.Root>
```
