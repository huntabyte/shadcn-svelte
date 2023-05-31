<script lang="ts">
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	const errors = getContext<Writable<string[] | undefined>>("errors");
</script>

{#if $errors}
	<label
		for={getContext("id")}
		class={cn("text-sm font-medium text-destructive", className)}
		{...$$restProps}
	>
		{$errors}
	</label>
{/if}
