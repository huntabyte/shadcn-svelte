<script lang="ts">
	import { clickToCopyAction } from "svelte-legos";
	import { cn } from "$lib/utils";
	import { Icons } from "./icons";

	let copied = false;
	let className: string | undefined | null = undefined;
	export let value = "";
	export { className as class };

	function handleCopyDone() {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

	function handleCopyError() {
		console.log("Error copying");
	}
</script>

<button
	class={cn(
		"relative z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none",
		className
	)}
	use:clickToCopyAction={value}
	on:copy-done={handleCopyDone}
	on:copy-error={handleCopyError}
	{...$$restProps}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Icons.check class="h-3 w-3" />
	{:else}
		<Icons.copy class="h-3 w-3" />
	{/if}
</button>
