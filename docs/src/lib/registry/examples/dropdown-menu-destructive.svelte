<script lang="ts">
	import PencilIcon from "@lucide/svelte/icons/pencil";
	import ShareIcon from "@lucide/svelte/icons/share";
	import TrashIcon from "@lucide/svelte/icons/trash";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>Actions</DropdownMenu.Trigger
	>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<PencilIcon />
				Edit
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<ShareIcon />
				Share
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item variant="destructive">
				<TrashIcon />
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
