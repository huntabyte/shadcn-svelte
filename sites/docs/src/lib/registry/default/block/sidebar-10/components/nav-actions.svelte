<script lang="ts" module>
	import ArrowDown from "@lucide/svelte/icons/arrow-down";
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import Bell from "@lucide/svelte/icons/bell";
	import ChartLine from "@lucide/svelte/icons/chart-line";
	import Copy from "@lucide/svelte/icons/copy";
	import CornerUpLeft from "@lucide/svelte/icons/corner-up-left";
	import CornerUpRight from "@lucide/svelte/icons/corner-up-right";
	import FileText from "@lucide/svelte/icons/file-text";
	import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";
	import Link from "@lucide/svelte/icons/link";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import Trash from "@lucide/svelte/icons/trash";
	import Trash2 from "@lucide/svelte/icons/trash-2";

	const data = [
		[
			{
				label: "Customize Page",
				icon: Settings2,
			},
			{
				label: "Turn into wiki",
				icon: FileText,
			},
		],
		[
			{
				label: "Copy Link",
				icon: Link,
			},
			{
				label: "Duplicate",
				icon: Copy,
			},
			{
				label: "Move to",
				icon: CornerUpRight,
			},
			{
				label: "Move to Trash",
				icon: Trash2,
			},
		],
		[
			{
				label: "Undo",
				icon: CornerUpLeft,
			},
			{
				label: "View analytics",
				icon: ChartLine,
			},
			{
				label: "Version History",
				icon: GalleryVerticalEnd,
			},
			{
				label: "Show delete pages",
				icon: Trash,
			},
			{
				label: "Notifications",
				icon: Bell,
			},
		],
		[
			{
				label: "Import",
				icon: ArrowUp,
			},
			{
				label: "Export",
				icon: ArrowDown,
			},
		],
	];
</script>

<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Popover from "$lib/registry/default/ui/popover/index.js";
	import * as Sidebar from "$lib/registry/default/ui/sidebar/index.js";
	import Ellipsis from "@lucide/svelte/icons/ellipsis";
	import Star from "@lucide/svelte/icons/star";
	import { untrack } from "svelte";

	let open = $state(false);

	$effect(() => {
		untrack(() => {
			open = true;
		});
	});
</script>

<div class="flex items-center gap-2 text-sm">
	<div class="text-muted-foreground hidden font-medium md:inline-block">Edit Oct 08</div>
	<Button variant="ghost" size="icon" class="h-7 w-7">
		<Star />
	</Button>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					size="icon"
					class="data-[state=open]:bg-accent h-7 w-7"
				>
					<Ellipsis />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-56 overflow-hidden rounded-lg p-0" align="end">
			<Sidebar.Root collapsible="none" class="bg-transparent">
				<Sidebar.Content>
					{#each data as group, index (index)}
						<Sidebar.Group class="border-b last:border-none">
							<Sidebar.GroupContent class="gap-0">
								<Sidebar.Menu>
									{#each group as item, index (index)}
										<Sidebar.MenuItem>
											<Sidebar.MenuButton>
												<item.icon /> <span>{item.label}</span>
											</Sidebar.MenuButton>
										</Sidebar.MenuItem>
									{/each}
								</Sidebar.Menu>
							</Sidebar.GroupContent>
						</Sidebar.Group>
					{/each}
				</Sidebar.Content>
			</Sidebar.Root>
		</Popover.Content>
	</Popover.Root>
</div>
