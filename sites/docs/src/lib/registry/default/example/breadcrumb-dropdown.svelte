<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import Slash from "@lucide/svelte/icons/slash";
	import * as Breadcrumb from "$lib/registry/default/ui/breadcrumb/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator>
			<Slash />
		</Breadcrumb.Separator>
		<Breadcrumb.Item>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="flex items-center gap-1">
					Components
					<ChevronDown class="size-4" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="start">
					<DropdownMenu.Item>Documentation</DropdownMenu.Item>
					<DropdownMenu.Item>Themes</DropdownMenu.Item>
					<DropdownMenu.Item>GitHub</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Breadcrumb.Item>
		<Breadcrumb.Separator>
			<Slash />
		</Breadcrumb.Separator>
		<Breadcrumb.Item>
			<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
