<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let open = $state(false);
</script>

<Collapsible.Root bind:open class="w-[350px] space-y-2">
	<div class="flex items-center justify-between space-x-4 px-4">
		<h4 class="text-sm font-semibold">Notifications</h4>
		<Collapsible.Trigger class={buttonVariants({ variant: "ghost", size: "sm" })}>
			<ChevronDownIcon
				class="size-4 transition-transform duration-200 {open ? 'rotate-180' : ''}"
			/>
			<span class="sr-only">Toggle</span>
		</Collapsible.Trigger>
	</div>
	<div class="rounded-md border px-4 py-3 text-sm">Push Notifications</div>
	<Collapsible.Content class="space-y-2">
		<div class="rounded-md border px-4 py-3 text-sm">Email Notifications</div>
		<div class="rounded-md border px-4 py-3 text-sm">SMS Notifications</div>
	</Collapsible.Content>
</Collapsible.Root>
