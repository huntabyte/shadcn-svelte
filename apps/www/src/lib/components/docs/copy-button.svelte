<script lang="ts">
	import { clickToCopyAction } from "svelte-legos";
	import { cn } from "$lib/utils";
	import { Check, Copy } from "radix-icons-svelte";

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
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4",
		className
	)}
	use:clickToCopyAction={value}
	on:copy-done={handleCopyDone}
	on:copy-error={handleCopyError}
	{...$$restProps}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Check class="h-3 w-3" />
	{:else}
		<Copy class="h-3 w-3" />
	{/if}
</button>
