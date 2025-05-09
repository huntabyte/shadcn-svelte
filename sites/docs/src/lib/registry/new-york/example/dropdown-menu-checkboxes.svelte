<script lang="ts">
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>Open</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Appearance</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
				Status Bar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
				Activity Bar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={showPanel}>Panel</DropdownMenu.CheckboxItem>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
