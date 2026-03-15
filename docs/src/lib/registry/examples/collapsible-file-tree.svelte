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
			<Collapsible.Trigger
				class={buttonVariants({ variant: "ghost", size: "sm", class: "h-7 gap-1 px-1" })}
			>
				<ChevronRightIcon
					class="size-4 transition-transform {srcOpen ? 'rotate-90' : ''}"
				/>
				{#if srcOpen}
					<FolderOpenIcon class="size-4 text-yellow-400" />
				{:else}
					<FolderIcon class="size-4 text-yellow-400" />
				{/if}
				src
			</Collapsible.Trigger>
		</div>
		<Collapsible.Content>
			<div class="mt-1 ml-4 space-y-1 border-l pl-3">
				<Collapsible.Root bind:open={componentsOpen}>
					<div class="flex items-center gap-1">
						<Collapsible.Trigger
							class={buttonVariants({
								variant: "ghost",
								size: "sm",
								class: "h-7 gap-1 px-1",
							})}
						>
							<ChevronRightIcon
								class="size-4 transition-transform {componentsOpen
									? 'rotate-90'
									: ''}"
							/>
							{#if componentsOpen}
								<FolderOpenIcon class="size-4 text-yellow-400" />
							{:else}
								<FolderIcon class="size-4 text-yellow-400" />
							{/if}
							components
						</Collapsible.Trigger>
					</div>
					<Collapsible.Content>
						<div class="mt-1 ml-4 space-y-1 border-l pl-3">
							<div class="flex h-7 items-center gap-1 px-1">
								<FileIcon class="text-muted-foreground size-4" />
								button.svelte
							</div>
							<div class="flex h-7 items-center gap-1 px-1">
								<FileIcon class="text-muted-foreground size-4" />
								input.svelte
							</div>
						</div>
					</Collapsible.Content>
				</Collapsible.Root>
				<div class="flex h-7 items-center gap-1 px-1">
					<FileIcon class="text-muted-foreground size-4" />
					app.svelte
				</div>
				<div class="flex h-7 items-center gap-1 px-1">
					<FileIcon class="text-muted-foreground size-4" />
					+page.svelte
				</div>
			</div>
		</Collapsible.Content>
	</Collapsible.Root>
</div>
