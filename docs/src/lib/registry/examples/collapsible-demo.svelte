<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let isOpen = $state(false);
</script>

<Collapsible.Root bind:open={isOpen} class="flex w-[350px] flex-col gap-2">
	<div class="flex items-center justify-between gap-4 px-4">
		<h4 class="text-sm font-semibold">Order #4189</h4>
		<Collapsible.Trigger
			class={buttonVariants({ variant: "ghost", size: "icon", class: "size-8" })}
		>
			<ChevronsUpDownIcon />
			<span class="sr-only">Toggle details</span>
		</Collapsible.Trigger>
	</div>
	<div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
		<span class="text-muted-foreground">Status</span>
		<span class="font-medium">Shipped</span>
	</div>
	<Collapsible.Content class="flex flex-col gap-2">
		<div class="rounded-md border px-4 py-2 text-sm">
			<p class="font-medium">Shipping address</p>
			<p class="text-muted-foreground">100 Market St, San Francisco</p>
		</div>
		<div class="rounded-md border px-4 py-2 text-sm">
			<p class="font-medium">Items</p>
			<p class="text-muted-foreground">2x Studio Headphones</p>
		</div>
	</Collapsible.Content>
</Collapsible.Root>
