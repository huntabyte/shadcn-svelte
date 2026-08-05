<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";

	let {
		name,
		required = false,
		class: className,
		children,
	}: {
		name: string;
		required?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();
	let context = useQuestionnaireContext();
	let active = $derived(context.activeItem === name);
</script>

<fieldset
	hidden={!active}
	aria-hidden={!active}
	data-slot="questionnaire-item"
	data-name={name}
	data-required={required}
	class={cn("min-w-0 space-y-4", className)}
>
	<legend class="sr-only">{name}</legend>
	{@render children?.()}
</fieldset>
