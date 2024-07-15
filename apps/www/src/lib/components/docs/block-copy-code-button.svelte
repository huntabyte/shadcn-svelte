<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Clipboard from "svelte-radix/Clipboard.svelte";
	import type { TooltipTriggerProps } from "bits-ui";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	let {
		code,
		disabled = false,
		...restProps
	}: TooltipTriggerProps & {
		code: string;
		disabled?: boolean;
	} = $props();

	let hasCopied = $state(false);

	$effect(() => {
		if (hasCopied) {
			setTimeout(() => {
				hasCopied = false;
			}, 2000);
		}
	});

	function copyToClipboard() {
		// Remove data-x-chunk-name and data-x-chunk-description attributes from the code
		// eslint-disable-next-line regexp/no-super-linear-backtracking
		const re = /<([a-zA-Z0-9.]+)([^>]*)data-x-chunk-name="[^"]*"([^>]*)>/g;

		const result = code.replace(re, (_all, elementName, p2, p3) => {
			// remove data-x-chunk-description from p2, leaves only the other attributes (scattered in p2 and p3)
			const otherAttributes = (p2 + p3)
				.replace(/data-x-chunk-description="[^"]*"/, "")
				.trim();
			return otherAttributes ? `<${elementName} ${otherAttributes}>` : `<${elementName}>`;
		});

		navigator.clipboard.writeText(result);
	}
</script>

<Tooltip.Root>
	<Tooltip.Trigger
		class={cn(
			buttonVariants({
				variant: "outline",
				size: "icon",
				class: "size-7 rounded-[6px] [&_svg]:size-3.5",
			})
		)}
		onclick={() => {
			copyToClipboard();
			hasCopied = true;
		}}
		{disabled}
		{...restProps}
	>
		<span class="sr-only">Copy</span>
		{#if hasCopied}
			<Check />
		{:else}
			<Clipboard />
		{/if}
	</Tooltip.Trigger>
	<Tooltip.Content avoidCollisions={false}>Copy code</Tooltip.Content>
</Tooltip.Root>
