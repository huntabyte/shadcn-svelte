<script lang="ts">
	import type { HTMLFormAttributes } from "svelte/elements";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { ZodValidation } from "sveltekit-superforms/index";
	import { setContext } from "svelte";
	import { cn } from "$lib/utils";

	type T = $$Generic<AnyZodObject>;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let form: SuperForm<ZodValidation<T>, unknown>;

	setContext("form", form);

	type $$Props = HTMLFormAttributes & {
		form: SuperForm<ZodValidation<T>, unknown>;
	};
</script>

<form {...$$restProps} class={cn(className)} use:form.enhance>
	<slot />
</form>
