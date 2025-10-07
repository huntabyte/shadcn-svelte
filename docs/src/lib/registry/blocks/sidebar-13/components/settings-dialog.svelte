<script lang="ts">
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import BellIcon from "@lucide/svelte/icons/bell";
	import CheckIcon from "@lucide/svelte/icons/check";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import HouseIcon from "@lucide/svelte/icons/house";
	import KeyboardIcon from "@lucide/svelte/icons/keyboard";
	import LinkIcon from "@lucide/svelte/icons/link";
	import LockIcon from "@lucide/svelte/icons/lock";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import PaintbrushIcon from "@lucide/svelte/icons/paintbrush";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import VideoIcon from "@lucide/svelte/icons/video";

	const data = {
		nav: [
			{ name: "Notifications", icon: BellIcon },
			{ name: "Navigation", icon: MenuIcon },
			{ name: "Home", icon: HouseIcon },
			{ name: "Appearance", icon: PaintbrushIcon },
			{ name: "Messages & media", icon: MessageCircleIcon },
			{ name: "Language & region", icon: GlobeIcon },
			{ name: "Accessibility", icon: KeyboardIcon },
			{ name: "Mark as read", icon: CheckIcon },
			{ name: "Audio & video", icon: VideoIcon },
			{ name: "Connected accounts", icon: LinkIcon },
			{ name: "Privacy & visibility", icon: LockIcon },
			{ name: "Advanced", icon: SettingsIcon },
		],
	};

	let open = $state(true);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button size="sm" {...props}>Open Dialog</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content
		class="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]"
		trapFocus={false}
	>
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
									<Breadcrumb.Link href="##">Settings</Breadcrumb.Link>
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
