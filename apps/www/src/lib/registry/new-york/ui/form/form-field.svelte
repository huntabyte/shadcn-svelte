<script lang="ts" context="module">
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import type { FormPath } from 'sveltekit-superforms'
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type T = Record<string, unknown>
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type U = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import type { SuperForm } from 'sveltekit-superforms'
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import * as FormPrimitive from 'formsnap'

	type $$Props = {
		form: SuperForm<T>;
			name: U;
	} & Omit<HTMLAttributes<HTMLDivElement>, "form">

	export let form: SuperForm<T>
	export let name: U;


	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<FormPrimitive.Field {form} {name}>
	<div class={cn("space-y-2", className)} {...$$restProps}>
		<slot />
	</div>
</FormPrimitive.Field>
