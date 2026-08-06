<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";

	let {
		name,
		required = false,
		multiple = false,
		disabled = false,
		class: className,
		children,
	}: {
		name: string;
		required?: boolean;
		multiple?: boolean;
		disabled?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();
	let context = useQuestionnaireContext();
	let active = $derived(context.activeItem === name);
	let item = $derived(context.items.find((entry) => entry.name === name));
	$effect(() => {
		if (item) Object.assign(item, { required, multiple, disabled });
	});
</script>

<fieldset
	hidden={!active}
	aria-hidden={!active}
	data-slot="questionnaire-item"
	data-name={name}
	data-required={required}
	data-multiple={multiple}
	data-disabled={disabled}
	class={cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className)}
>
	<legend class="sr-only">{name}</legend>
	{@render children?.()}
</fieldset>
