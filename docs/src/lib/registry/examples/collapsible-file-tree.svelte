<script lang="ts">
	import FolderIcon from "@lucide/svelte/icons/folder";
	import FolderOpenIcon from "@lucide/svelte/icons/folder-open";
	import FileIcon from "@lucide/svelte/icons/file";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let srcOpen = $state(true);
	let componentsOpen = $state(false);
</script>

<div class="w-[280px] font-mono text-sm">
	<Collapsible.Root bind:open={srcOpen}>
		<div class="flex items-center gap-1">
			<Collapsible.Trigger class={buttonVariants({ variant: "ghost", size: "sm", class: "gap-1 h-7 px-1" })}>
				<ChevronRightIcon class="size-4 transition-transform {srcOpen ? 'rotate-90' : ''}" />
				{#if srcOpen}
					<FolderOpenIcon class="size-4 text-yellow-400" />
				{:else}
					<FolderIcon class="size-4 text-yellow-400" />
				{/if}
				src
			</Collapsible.Trigger>
		</div>
		<Collapsible.Content>
			<div class="ml-4 space-y-1 border-l pl-3 mt-1">
				<Collapsible.Root bind:open={componentsOpen}>
					<div class="flex items-center gap-1">
						<Collapsible.Trigger class={buttonVariants({ variant: "ghost", size: "sm", class: "gap-1 h-7 px-1" })}>
							<ChevronRightIcon class="size-4 transition-transform {componentsOpen ? 'rotate-90' : ''}" />
							{#if componentsOpen}
								<FolderOpenIcon class="size-4 text-yellow-400" />
							{:else}
								<FolderIcon class="size-4 text-yellow-400" />
							{/if}
							components
						</Collapsible.Trigger>
					</div>
					<Collapsible.Content>
						<div class="ml-4 space-y-1 border-l pl-3 mt-1">
							<div class="flex items-center gap-1 h-7 px-1">
								<FileIcon class="size-4 text-muted-foreground" />
								button.svelte
							</div>
							<div class="flex items-center gap-1 h-7 px-1">
								<FileIcon class="size-4 text-muted-foreground" />
								input.svelte
							</div>
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
				<div class="flex items-center gap-1 h-7 px-1">
					<FileIcon class="size-4 text-muted-foreground" />
					app.svelte
				</div>
				<div class="flex items-center gap-1 h-7 px-1">
					<FileIcon class="size-4 text-muted-foreground" />
					+page.svelte
				</div>
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
</div>
