<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { Button } from "$lib/registry/ui/button/index.js";

	let open = $state(false);
</script>

<Collapsible.Root bind:open class="flex w-full flex-col gap-2 md:w-[350px]">
	<div class="flex items-center justify-between gap-4 px-4">
		<h4 class="line-clamp-1 text-sm font-semibold">@peduarte starred 3 repositories</h4>
		<Collapsible.Trigger>
			{#snippet child({ props })}
				<Button variant="ghost" size="sm" {...props}>
					<ChevronsUpDownIcon class="h-4 w-4" />
					<span class="sr-only">Toggle</span>
				</Button>
			{/snippet}
		</Collapsible.Trigger>
	</div>
	<div class="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
	<Collapsible.Content class="flex flex-col gap-2">
		<div class="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
		<div class="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
	</Collapsible.Content>
</Collapsible.Root>
