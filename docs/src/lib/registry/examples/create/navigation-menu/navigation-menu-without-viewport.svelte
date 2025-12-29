<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
</script>

<Example title="Without Viewport">
	<NavigationMenu.Root viewport={false}>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Link class={navigationMenuTriggerStyle()}>
					{#snippet child({ props })}
						<a {...props} href="/docs">Documentation</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>List</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="w-72">
						<li>
							<NavigationMenu.Link href="#">
								<div class="flex flex-col">
									<div class="font-medium">Components</div>
									<div class="text-muted-foreground">
										Browse all components in the library.
									</div>
								</div>
							</NavigationMenu.Link>
							<NavigationMenu.Link href="#">
								<div class="flex flex-col">
									<div class="font-medium">Documentation</div>
									<div class="text-muted-foreground">
										Learn how to use the library.
									</div>
								</div>
							</NavigationMenu.Link>
							<NavigationMenu.Link href="#">
								<div class="flex flex-col">
									<div class="font-medium">Blog</div>
									<div class="text-muted-foreground">
										Read our latest blog posts.
									</div>
								</div>
							</NavigationMenu.Link>
						</li>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Simple List</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul>
						<li>
							<NavigationMenu.Link href="#">Components</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
							<NavigationMenu.Link href="#">Blocks</NavigationMenu.Link>
						</li>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[200px]">
						<li>
							<NavigationMenu.Link href="#" class="flex-row items-center gap-2">
								<CircleAlertIcon />
								Backlog
							</NavigationMenu.Link>
							<NavigationMenu.Link href="#" class="flex-row items-center gap-2">
								<CircleAlertIcon />
								To Do
							</NavigationMenu.Link>
							<NavigationMenu.Link href="#">
								<CircleAlertIcon />
								Done
							</NavigationMenu.Link>
						</li>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</Example>
