<script lang="ts">
	import { cn } from "@/utils";
	import { getContext } from "svelte";
	import type { FormFieldCtx } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formDescriptionId } = getContext<FormFieldCtx>("FormField");
</script>

<p
	class={cn("text-[0.8rem] text-muted-foreground", className)}
	{...$$restProps}
	id={formDescriptionId}
>
	<slot />
</p>
