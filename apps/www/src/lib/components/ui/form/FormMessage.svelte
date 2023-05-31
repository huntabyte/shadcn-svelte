<script lang="ts">
	import type { ErrorsContext } from ".";
	import { getContext } from "svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	const errors = getContext<ErrorsContext>("errors");
</script>

{#if $errors}
	<span
		id={getContext("id")}
		class={cn("text-sm font-medium text-destructive", className)}
		{...$$restProps}
	>
		{$errors}
	</span>
{/if}
