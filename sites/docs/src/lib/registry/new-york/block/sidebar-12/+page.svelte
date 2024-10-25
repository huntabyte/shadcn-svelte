<script lang="ts">
	import AppSidebar from "$lib/registry/new-york/block/sidebar-12/components/app-sidebar.svelte";
	import * as Breadcrumb from "$lib/registry/new-york/ui/breadcrumb/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4"
		>
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Page>October 2024</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-5">
				{#each Array.from({ length: 20 }) as _, index (index)}
					<div class="bg-muted/50 aspect-square rounded-xl"></div>
				{/each}
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
