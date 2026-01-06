<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);
</script>

<Example title="With Checkboxes">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Checkboxes</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="min-w-40">
			<DropdownMenu.Group>
				<DropdownMenu.Label>Appearance</DropdownMenu.Label>
				<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
					<IconPlaceholder
						lucide="LayoutIcon"
						tabler="IconLayout"
						hugeicons="LayoutIcon"
						phosphor="LayoutIcon"
					/>
					Status Bar
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
					<IconPlaceholder
						lucide="ActivityIcon"
						tabler="IconActivity"
						hugeicons="ActivityIcon"
						phosphor="PulseIcon"
					/>
					Activity Bar
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem bind:checked={showPanel}>
					<IconPlaceholder
						lucide="PanelLeftIcon"
						tabler="IconLayoutSidebar"
						hugeicons="LayoutLeftIcon"
						phosphor="SidebarIcon"
					/>
					Panel
				</DropdownMenu.CheckboxItem>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
