<script lang="ts">
	import * as Breadcrumb from "$lib/registry/new-york/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
	import Bell from "@lucide/svelte/icons/bell";
	import Check from "@lucide/svelte/icons/check";
	import Globe from "@lucide/svelte/icons/globe";
	import House from "@lucide/svelte/icons/house";
	import Keyboard from "@lucide/svelte/icons/keyboard";
	import Link from "@lucide/svelte/icons/link";
	import Lock from "@lucide/svelte/icons/lock";
	import Menu from "@lucide/svelte/icons/menu";
	import MessageCircle from "@lucide/svelte/icons/message-circle";
	import Paintbrush from "@lucide/svelte/icons/paintbrush";
	import Settings from "@lucide/svelte/icons/settings";
	import Video from "@lucide/svelte/icons/video";

	const data = {
		nav: [
			{ name: "Notifications", icon: Bell },
			{ name: "Navigation", icon: Menu },
			{ name: "Home", icon: House },
			{ name: "Appearance", icon: Paintbrush },
			{ name: "Messages & media", icon: MessageCircle },
			{ name: "Language & region", icon: Globe },
			{ name: "Accessibility", icon: Keyboard },
			{ name: "Mark as read", icon: Check },
			{ name: "Audio & video", icon: Video },
			{ name: "Connected accounts", icon: Link },
			{ name: "Privacy & visibility", icon: Lock },
			{ name: "Advanced", icon: Settings },
		],
	};

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button size="sm" {...props}>Open Dialog</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
		<Dialog.Title class="sr-only">Settings</Dialog.Title>
		<Dialog.Description class="sr-only">Customize your settings here.</Dialog.Description>
		<Sidebar.Provider class="items-start">
			<Sidebar.Root collapsible="none" class="hidden md:flex">
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{#each data.nav as item (item.name)}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											isActive={item.name === "Messages & media"}
										>
											{#snippet child({ props })}
												<a href="##" {...props}>
													<item.icon />
													<span>{item.name}</span>
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar.Root>
			<main class="flex h-[480px] flex-1 flex-col overflow-hidden">
				<header
					class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
				>
					<div class="flex items-center gap-2 px-4">
						<Breadcrumb.Root>
							<Breadcrumb.List>
								<Breadcrumb.Item class="hidden md:block">
									<Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
								</Breadcrumb.Item>
								<Breadcrumb.Separator class="hidden md:block" />
								<Breadcrumb.Item>
									<Breadcrumb.Page>Messages & media</Breadcrumb.Page>
								</Breadcrumb.Item>
							</Breadcrumb.List>
						</Breadcrumb.Root>
					</div>
				</header>
				<div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
					{#each Array.from({ length: 10 }) as _, i (i)}
						<div class="bg-muted/50 aspect-video max-w-3xl rounded-xl"></div>
					{/each}
				</div>
			</main>
		</Sidebar.Provider>
	</Dialog.Content>
</Dialog.Root>
