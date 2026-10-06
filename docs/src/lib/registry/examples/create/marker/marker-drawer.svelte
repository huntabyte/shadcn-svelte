<script lang="ts">
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Drawer">
	<Drawer.Root direction="right">
		<Marker.Root variant="separator">
			<Drawer.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>
						<IconPlaceholder
							lucide="SearchIcon"
							tabler="IconSearch"
							hugeicons="SearchIcon"
							phosphor="MagnifyingGlassIcon"
							remixicon="RiSearchLine"
							data-icon="inline-start"
						/>
						Explored 4 files
					</Button>
				{/snippet}
			</Drawer.Trigger>
		</Marker.Root>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>File Activity</Drawer.Title>
				<Drawer.Description>Files read while preparing the response.</Drawer.Description>
			</Drawer.Header>
			<div class="grid gap-3 px-4 text-sm">
				<div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
					<span class="truncate">app/chat/page.tsx</span>
					<span class="text-muted-foreground">read</span>
				</div>
				<div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
					<span class="truncate">components/message.tsx</span>
					<span class="text-muted-foreground">read</span>
				</div>
				<div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
					<span class="truncate">lib/ai.ts</span>
					<span class="text-muted-foreground">read</span>
				</div>
			</div>
			<Drawer.Footer>
				<Drawer.Close>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Close</Button>
					{/snippet}
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
</Example>
