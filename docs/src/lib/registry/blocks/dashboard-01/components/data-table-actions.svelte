<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import DotsVerticalIcon from "@tabler/icons-svelte/icons/dots-vertical";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="data-[state=open]:bg-muted text-muted-foreground flex size-8">
		{#snippet child({ props })}
			<Button variant="ghost" size="icon" {...props}>
				<DotsVerticalIcon />
				<span class="sr-only">Open menu</span>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-32">
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Item>Make a copy</DropdownMenu.Item>
		<DropdownMenu.Item>Favorite</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
