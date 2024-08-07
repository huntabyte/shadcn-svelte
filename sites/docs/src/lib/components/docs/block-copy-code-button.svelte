<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Clipboard from "svelte-radix/Clipboard.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";

	let hasCopied = false;
	export let code: string;

	$: if (hasCopied) {
		setTimeout(() => {
			hasCopied = false;
		}, 2000);
	}

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
	<Tooltip.Trigger asChild let:builder>
		<Button
			size="icon"
			variant="outline"
			class="h-7 w-7 rounded-[6px] [&_svg]:size-3.5"
			builders={[builder]}
			on:click={() => {
				copyToClipboard();
				hasCopied = true;
			}}
			{...$$restProps}
		>
			<span class="sr-only">Copy</span>
			{#if hasCopied}
				<Check />
			{:else}
				<Clipboard />
			{/if}
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content avoidCollisions={false}>Copy code</Tooltip.Content>
</Tooltip.Root>
