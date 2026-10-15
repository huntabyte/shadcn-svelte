<script lang="ts">
	import { onDestroy } from "svelte";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value,
		variant = "ghost",
		size = "icon-xs",
		onclick,
		...restProps
	}: Omit<ButtonProps, "onclick"> & {
		value: string;
		onclick?: (e: MouseEvent) => void;
	} = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function copy() {
		navigator.clipboard
			.writeText(value)
			.then(() => {
				copied = true;
				clearTimeout(timeout);
				timeout = setTimeout(() => (copied = false), 2000);
			})
			.catch(() => {});
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<Button
	bind:ref
	data-slot="code-block-copy-button"
	data-copied={copied || undefined}
	{variant}
	{size}
	aria-label={copied ? "Copied" : "Copy"}
	class={cn("cn-code-block-copy-button", className)}
	onclick={(e) => {
		onclick?.(e);
		copy();
	}}
	{...restProps}
>
	{#if copied}
		<IconPlaceholder
			lucide="CheckIcon"
			tabler="IconCheck"
			hugeicons="Tick02Icon"
			phosphor="CheckIcon"
			remixicon="RiCheckLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="CopyIcon"
			tabler="IconCopy"
			hugeicons="Copy01Icon"
			phosphor="CopyIcon"
			remixicon="RiFileCopyLine"
		/>
	{/if}
</Button>
<span aria-live="polite" class="sr-only">{copied ? "Copied" : ""}</span>
