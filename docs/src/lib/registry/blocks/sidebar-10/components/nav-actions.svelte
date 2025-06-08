<script lang="ts" module>
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import BellIcon from "@lucide/svelte/icons/bell";
	import ChartLineIcon from "@lucide/svelte/icons/chart-line";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CornerUpLeftIcon from "@lucide/svelte/icons/corner-up-left";
	import CornerUpRightIcon from "@lucide/svelte/icons/corner-up-right";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import LinkIcon from "@lucide/svelte/icons/link";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import TrashIcon from "@lucide/svelte/icons/trash";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	const data = [
		[
			{
				label: "Customize Page",
				icon: Settings2Icon,
			},
			{
				label: "Turn into wiki",
				icon: FileTextIcon,
			},
		],
		[
			{
				label: "Copy Link",
				icon: LinkIcon,
			},
			{
				label: "Duplicate",
				icon: CopyIcon,
			},
			{
				label: "Move to",
				icon: CornerUpRightIcon,
			},
			{
				label: "Move to Trash",
				icon: Trash2Icon,
			},
		],
		[
			{
				label: "Undo",
				icon: CornerUpLeftIcon,
			},
			{
				label: "View analytics",
				icon: ChartLineIcon,
			},
			{
				label: "Version History",
				icon: GalleryVerticalEndIcon,
			},
			{
				label: "Show delete pages",
				icon: TrashIcon,
			},
			{
				label: "Notifications",
				icon: BellIcon,
			},
		],
		[
			{
				label: "Import",
				icon: ArrowUpIcon,
			},
			{
				label: "Export",
				icon: ArrowDownIcon,
			},
		],
	];
</script>

<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
	import StarIcon from "@lucide/svelte/icons/star";
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
	<Button variant="ghost" size="icon" class="size-7">
		<StarIcon />
	</Button>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					size="icon"
					class="data-[state=open]:bg-accent size-7"
				>
					<EllipsisIcon />
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
											<Sidebar.MenuButton
												class="hover:bg-accent hover:text-accent-foreground"
											>
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
