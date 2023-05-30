<script lang="ts">
	import type { HTMLFormAttributes } from "svelte/elements";
	import type { SuperForm } from "sveltekit-superforms/client";
	import type { UnwrapEffects } from "sveltekit-superforms/index";
	import { cn } from "$lib/utils";

	type T = $$Generic<AnyZodObject>;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let form: SuperForm<UnwrapEffects<T>, unknown>;

	type $$Props = HTMLFormAttributes & {
		form: SuperForm<UnwrapEffects<T>, unknown>;
	};
</script>

<form {...$$restProps} class={cn(className)}>
	<slot {form} />
</form>
