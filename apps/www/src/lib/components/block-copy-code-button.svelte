<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Clipboard from "svelte-radix/Clipboard.svelte";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";

	let hasCopied = false;
	export let code: string;

	$: {
		if (hasCopied) {
			setTimeout(() => {
				hasCopied = false;
			}, 2000);
		}
	}
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			size="icon"
			variant="outline"
			class="h-7 w-7 [&_svg]:size-3.5"
			builders={[builder]}
			on:click={() => {
				navigator.clipboard.writeText(code);
				hasCopied = true;
			}}
		>
			<span class="sr-only">Copy</span>
			{#if hasCopied}
				<Check />
			{:else}
				<Clipboard />
			{/if}
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>Copy code</Tooltip.Content>
</Tooltip.Root>
