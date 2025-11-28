---
title: Formsnap
description: Building forms with Formsnap, Superforms, & Zod.
links:
  doc: https://formsnap.dev
  source: https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/ui/form
---

<script>
  import Callout from '$lib/components/callout.svelte'
	import ComponentPreview from "$lib/components/component-preview.svelte";
	import PMAddComp from "$lib/components/pm-add-comp.svelte";
	import PMInstall from "$lib/components/pm-install.svelte";
	import Steps from "$lib/components/steps.svelte";
	import InfoIcon from "@lucide/svelte/icons/info"
</script>

<Callout title="We are not actively developing this component anymore." icon={InfoIcon}>

The Form component is an abstraction over the `formsnap` & `sveltekit-superforms` libraries. Going forward, we recommend using the [`<Field />`](/docs/components/field) component to build forms. See the [Form](/docs/forms) documentation for more information.

</Callout>

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
- Form field components for scoping form state.
- Form validation using [Zod](https://zod.dev) or any other validation library supported by [Superforms](https://superforms.rocks).
- Applies the correct `aria` attributes to form fields based on states.
- Enables you to easily use various components like [Select](/docs/components/select), [RadioGroup](/docs/components/radio-group), [Switch](/docs/components/switch), [Checkbox](/docs/components/checkbox) and other form components with forms.

If you aren't familiar with [Superforms](https://superforms.rocks) & [Formsnap](https://formsnap.dev), you should check out their documentation first, as this guide assumes you have a basic understanding of how they work together.

## Anatomy

```svelte showLineNumbers
<form>
  <Form.Field>
    <Form.Control>
      <Form.Label />
      <!-- Any Form input component -->
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

## Example

```svelte showLineNumbers
<form method="POST" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

## Installation

<PMAddComp name="form" />

## Usage

<Steps>

### Create a form schema

Define the shape of your form using a Zod schema. You can read more about using Zod in the [Zod documentation](https://zod.dev). We're going to define it in a file called `schema.ts` in the same directory as our page component, but you can put it anywhere you like.

```ts title="src/routes/settings/schema.ts" showLineNumbers
import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export type FormSchema = typeof formSchema;
```

### Setup the load function

```ts title="src/routes/settings/+page.server.ts" showLineNumbers
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod4 } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};
```

### Create form component

For this example, we'll be passing the `form` returned from the load function as a prop to this component. To ensure it's typed properly, we'll use the `SuperValidated` type from `sveltekit-superforms`, and pass in the type of our form schema.

```svelte title="src/routes/settings/settings-form.svelte" showLineNumbers
<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    validators: zod4Client(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="username">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input {...props} bind:value={$formData.username} />
      {/snippet}
    </Form.Control>
    <Form.Description>This is your public display name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
```

The `name`, `id`, and all accessibility attributes are applied to the input by spreading the `attrs` object from the `Form.Control` component. The `Form.Label` will automatically be associated with the input using the `for` attribute, so you don't have to worry about that.

### Use the component

We'll pass the `form` from the data returned from the load function to the form component we created above.

```svelte title="src/routes/settings/+page.svelte" showLineNumbers
<script lang="ts">
  import type { PageData } from "./$types.js";
  import SettingsForm from "./settings-form.svelte";
  let { data }: { data: PageData } = $props();
</script>

<SettingsForm {data} />
```

### Create an Action

```ts title="src/routes/settings/+page.server.ts" showLineNumbers {1-2,13-25}
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};
```

### Done

That's it. You now have a fully accessible form that is type-safe and has client & server side validation.

<ComponentPreview name="form-demo">

<div></div>

</ComponentPreview>

</Steps>

## Next Steps

Be sure to check out the [Formsnap](https://formsnap.dev) and [Superforms](https://superforms.rocks) documentation for more information on how to use them.

## Examples

See the following links for more examples on how to use the other `Form` components:

- [Checkbox](/docs/components/checkbox#form)
- [Date Picker](/docs/components/date-picker#form)
- [Input](/docs/components/input#form)
- [Radio Group](/docs/components/radio-group#form)
- [Select](/docs/components/select#form)
- [Switch](/docs/components/switch#form)
- [Textarea](/docs/components/textarea#form)
