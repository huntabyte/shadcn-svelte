<script lang="ts">
	import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

	let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({
			variant: "ghost",
			class: "relative size-8",
		})}
	>
		<span class="sr-only">Open menu</span>
		<DotsHorizontal class="size-4" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupLabel>Actions</DropdownMenu.GroupLabel>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				Copy payment ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
