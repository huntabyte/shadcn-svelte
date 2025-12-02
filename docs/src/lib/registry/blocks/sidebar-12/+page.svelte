<script lang="ts">
	import AppSidebar from "./components/app-sidebar.svelte";
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4"
		>
			<Sidebar.Trigger class="-ms-1" />
			<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
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
