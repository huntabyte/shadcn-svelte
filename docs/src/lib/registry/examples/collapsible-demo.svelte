<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let isOpen = $state(false);
</script>

<Collapsible.Root bind:open={isOpen} class="flex w-[350px] flex-col gap-2">
	<div class="flex items-center justify-between gap-4 px-4">
		<h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
		<Collapsible.Trigger
			class={buttonVariants({ variant: "ghost", size: "icon", class: "size-8" })}
		>
			<ChevronsUpDownIcon />
			<span class="sr-only">Toggle</span>
		</Collapsible.Trigger>
	</div>
	<div class="rounded-md border px-4 py-2 font-mono text-sm">@huntabyte/bits-ui</div>
	<Collapsible.Content class="flex flex-col gap-2">
		<div class="rounded-md border px-4 py-2 font-mono text-sm">@melt-ui/melt-ui</div>
		<div class="rounded-md border px-4 py-2 font-mono text-sm">@sveltejs/svelte</div>
	</Collapsible.Content>
</Collapsible.Root>
