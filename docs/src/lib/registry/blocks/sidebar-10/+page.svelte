<script lang="ts">
	import AppSidebar from "./components/app-sidebar.svelte";
	import NavActions from "./components/nav-actions.svelte";
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-14 shrink-0 items-center gap-2">
			<div class="flex flex-1 items-center gap-2 px-3">
				<Sidebar.Trigger />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Page class="line-clamp-1">
								Project Management & Task Tracking
							</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="ms-auto px-3">
				<NavActions />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 px-4 py-10">
			<div class="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl"></div>
			<div class="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
