<script lang="ts">
	import type { FieldPath, UnwrapEffects } from "sveltekit-superforms";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { AnyZodObject, z } from "zod";
	import { setContext } from "svelte";
	import { formFieldProxy } from "sveltekit-superforms/client";

	type T = $$Generic<AnyZodObject>;

	export let form: SuperForm<UnwrapEffects<T>, unknown>;
	export let name: keyof z.infer<T> | FieldPath<z.infer<T>>;
	const { path, value, errors, constraints } = formFieldProxy(form, name);
</script>

<slot />
