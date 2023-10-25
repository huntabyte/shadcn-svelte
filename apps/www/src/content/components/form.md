---
title: Formsnap & Superforms
description: Building forms with Formsnap, Superforms, & Zod.
---

<script>
	import { Steps, ComponentPreview, FormPreview } from '@/components/docs';
</script>

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

- Well-structured and semantically correct.
- Easy to use and navigate (keyboard).
- Accessible with ARIA attributes and proper labels.
- Has support for client and server side validation.
- Well-styled and consistent with the rest of the application.

In this guide, we will take a look at building forms with [formsnap](https://formsnap.dev), [sveltekit-superforms](https://superforms.rocks) and [zod](https://zod.dev).

## Features

The `Form` components offered by `shadcn-svelte` are wrappers around `formsnap` & `sveltekit-superforms` which provide a few things:

- Composable components for building forms.
- A `<Form.Field />` component for building controlled form fields.
- Form validation using `zod`.
- Applies the correct `aria` attributes to form fields based on states.
- Enables you to easily use various components like [Select](/docs/components/select), [RadioGroup](/docs/components/radio-group), [Switch](/docs/components/switch), [Checkbox](/docs/components/checkbox) and other form components as form fields.
- Provides an optional native `<select />` & `<input type="radio" />` with out of the box functionality if you prefer to use native form elements rather than the `bits-ui` components.

If you aren't familiar with [Superforms](https://superforms.rocks) & [Formsnap](https://formsnap.dev), you should check out their documentation first, as this guide assumes you have a basic understanding of how they work together.

## Anatomy

```svelte
<Form.Root>
  <Form.Field>
    <Form.Item>
      <Form.Label />
      <!-- Any Form input component -->
      <Form.Description />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
</Form.Root>
```

## Example

```svelte
<Form.Root {schema} {form} let:config>
  <Form.Field {config} name="email">
    <Form.Item>
      <Form.Label />
      <Form.Input />
      <Form.Description />
      <Form.Validation />
    </Form.Item>
  </Form.Field>
</Form.Root>
```

## Installation

```bash
npx shadcn-svelte@latest add form
```

## Usage

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev). We're going to define it in a file called `schema.ts` in the same directly as our page component, but you can put it anywhere you like.

```ts title="src/routes/settings/schema.ts" showLineNumbers
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2).max(50)
});

export type FormSchema = typeof formSchema;
```

### Return the form from the route's load function

```ts title="src/routes/settings/+page.server.ts" showLineNumbers
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";

export const load: PageServerLoad = () => {
  return {
    form: superValidate(formSchema)
  };
};
```

### Create a form component

For this example, we'll be passing the `form` returned from the load function as a prop to this component. To ensure it's typed properly, we'll use the `SuperValidated` type from `sveltekit-superforms`, and pass in the type of our form schema.

```svelte title="src/routes/settings/settings-form.svelte" showLineNumbers
<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { formSchema, type FormSchema } from "./schema";
  import type { SuperValidated } from "sveltekit-superforms";

  export let form: SuperValidated<FormSchema>;
</script>

<Form.Root method="POST" {form} schema={formSchema} let:config>
  <Form.Field {config} name="username">
    <Form.Item>
      <Form.Label>Username</Form.Label>
      <Form.Input />
      <Form.Description>This is your public display name.</Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</Form.Root>
```

The `name`, `value`, and all accessibility attributes will be automatically applied to the input thanks to [Formsnap](https://formsnap.dev).

### Create a page component that uses the form

We'll pass the `form` from the data returned from the load function to the form component we created above.

```svelte title="src/routes/settings/+page.svelte" showLineNumbers
<script lang="ts">
  import type { PageData } from "./$types";
  import SettingsForm from "./settings-form.svelte";
  export let data: PageData;
</script>

<SettingsForm form={data.form} />
```

### Create an Action that handles the form submission

```ts title="src/routes/settings/+page.server.ts" showLineNumbers {1-2,12-24}
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";

export const load: PageServerLoad = () => {
  return {
    form: superValidate(formSchema)
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, formSchema);
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    return {
      form
    };
  }
};
```

### Done

That's it. You now have a fully accessible form that is type-safe and has client & server side validation.

<FormPreview />

</Steps>

## Examples

See the following links for more examples on how to use the other `Form` components:

- [Checkbox](/docs/components/checkbox#form)
- [Input](/docs/components/input#form)
- [Radio Group](/docs/components/radio-group#form)
- [Select](/docs/components/select#form)
- [Switch](/docs/components/switch#form)
- [Textarea](/docs/components/textarea#form)
