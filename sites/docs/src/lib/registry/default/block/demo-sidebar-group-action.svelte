<script lang="ts">
	import * as Sidebar from "$lib/registry/default/ui/sidebar/index.js";
	import { Toaster } from "$lib/registry/default/ui/sonner/index.js";
	import Plus from "@lucide/svelte/icons/plus";
	import Frame from "@lucide/svelte/icons/frame";
	import ChartPie from "@lucide/svelte/icons/chart-pie";
	import Map from "@lucide/svelte/icons/map";
	import { toast } from "svelte-sonner";
</script>

<Sidebar.Provider>
	<Toaster
		position="bottom-left"
		toastOptions={{
			class: "ml-[160px]",
		}}
	/>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
				<Sidebar.GroupAction
					title="Add Project"
					onclick={() => toast("You clicked the group action!")}
				>
					<Plus /> <span class="sr-only">Add Project</span>
				</Sidebar.GroupAction>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="##" {...props}>
										<Frame />
										<span>Design Engineering</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="##" {...props}>
										<ChartPie />
										<span>Sales & Marketing</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href="##" {...props}>
										<Map />
										<span>Travel</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
</Sidebar.Provider>
