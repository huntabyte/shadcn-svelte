<script lang="ts">
	import * as DropdownMenu from "@/registry/default/ui/dropdown-menu";
	import { Button } from "@/registry/default/ui/button";

	let showStatusBar = true;
	let showActivityBar = false;
	let showPanel = false;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]}>Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Appearance</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
			Status Bar
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
			Activity Bar
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.CheckboxItem bind:checked={showPanel}>
			Panel
		</DropdownMenu.CheckboxItem>
	</DropdownMenu.Content>
</DropdownMenu.Root>
