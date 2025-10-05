<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLFieldsetAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLFieldsetAttributes = $props();
</script>

<fieldset
	data-slot="field-set"
	class={cn(
		"flex flex-col gap-6",
		"has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</fieldset>
