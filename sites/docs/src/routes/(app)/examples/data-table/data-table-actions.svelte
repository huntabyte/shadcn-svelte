<script lang="ts">
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

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
		<EllipsisIcon />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				Copy payment ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
