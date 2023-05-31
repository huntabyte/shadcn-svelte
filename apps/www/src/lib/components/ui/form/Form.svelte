<script lang="ts">
	import type { HTMLFormAttributes } from "svelte/elements";
	import type { SuperFormUnwrap } from ".";
	import { cn } from "$lib/utils";

	type T = $$Generic<AnyZodObject>;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let form: SuperFormUnwrap<T>;

	type $$Props = HTMLFormAttributes & {
		form: SuperFormUnwrap<T, unknown>;
	};
</script>

<form {...$$restProps} class={cn(className)} use:form.enhance>
	<slot {form} />
</form>
