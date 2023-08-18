<script lang="ts">
	import { cn } from "@/utils";
	import { getContext } from "svelte";
	import type { FormFieldContext } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	const { formMessageId, errors } = getContext<FormFieldContext>("FormField");
</script>

{#if $errors}
	<p
		class={cn("text-sm font-medium text-destructive", className)}
		id={formMessageId}
	>
		{$errors}
	</p>
{/if}
