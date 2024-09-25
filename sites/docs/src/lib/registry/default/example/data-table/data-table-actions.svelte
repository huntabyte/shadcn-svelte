<script lang="ts">
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import { buttonVariants } from "$lib/registry/default/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";

	let { id }: { id: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({ variant: "ghost", size: "icon", class: "relative size-8 p-0" })}
	>
		<span class="sr-only">Open menu</span>
		<Ellipsis class="size-4" />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				Copy payment ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>View customer</DropdownMenu.Item>
		<DropdownMenu.Item>View payment details</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
