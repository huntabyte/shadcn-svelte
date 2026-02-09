<script lang="ts">
	import LayoutToggle from "$lib/components/layout-toggle.svelte";
	import ModeSwitcher from "$lib/components/mode-switcher.svelte";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import ItemExplorer from "../components/item-explorer.svelte";
	import ItemPicker from "../components/item-picker.svelte";
	import WelcomeDialog from "../components/welcome-dialog.svelte";
	import Customizer from "../components/customizer.svelte";
	import { examples } from "$lib/registry/examples/create/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import InitializeDialog from "../components/initialize-dialog.svelte";
	import UndoIcon from "@lucide/svelte/icons/undo";
	import RedoIcon from "@lucide/svelte/icons/redo";
	import { useIsMac } from "$lib/hooks/use-is-mac.svelte.js";
	import Share from "../components/share.svelte";
	import Metadata from "$lib/components/metadata.svelte";
	import RandomButton from "../components/random-button.svelte";
	import MobileNav from "$lib/components/mobile-nav.svelte";
	import MainNav from "$lib/components/main-nav.svelte";
	import { mainNavItems } from "$lib/navigation.js";
	import Logo from "$lib/components/logo.svelte";

	let { children } = $props();

	const designSystem = useDesignSystem();

	const isMac = useIsMac();
	const cmdOrCtrl = $derived(isMac ? "⌘" : "Ctrl");
</script>

<Metadata
	title="New Project"
	description="Build your own shadcn-svelte."
	ogImage={{
		url: `/create/og${new URL(designSystem.shareUrl).search}`,
		width: "1200",
		height: "630",
	}}
/>

<div data-slot="layout" class="section-soft relative z-10 flex min-h-svh flex-col">
	<header class="sticky top-0 z-50 w-full">
		<div class="container-wrapper 3xl:fixed:px-0 px-6">
			<div
				class="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!"
			>
				<div class="flex h-(--header-height) items-center **:data-[slot=separator]:h-4!">
					<MobileNav class="flex lg:hidden" />
					<Button href="/" variant="ghost" size="icon" class="hidden size-8 lg:flex">
						<Logo class="size-5" />
						<span class="sr-only">shadcn-svelte</span>
					</Button>
					<MainNav items={mainNavItems} class="hidden lg:block" />
				</div>
				<div
					class="fixed inset-x-0 bottom-0 ml-auto flex max-w-full flex-1 items-center justify-end gap-2 overflow-x-auto px-4.5 pb-4 sm:static sm:p-0 lg:ml-0"
				>
					<ItemPicker items={examples} />
					<div class="flex items-center gap-2 sm:hidden">
						<RandomButton />
					</div>
					<Separator orientation="vertical" class="mr-2 hidden sm:flex" />
				</div>
				<div class="ml-auto flex place-items-center gap-2 sm:ml-0 md:justify-end">
					<div class="hidden items-center gap-2 xl:flex">
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger
									class={buttonVariants({ variant: "ghost", size: "icon-sm" })}
									onclick={() => designSystem.undo()}
									disabled={!designSystem.canUndo}
								>
									<UndoIcon class="size-4" />
								</Tooltip.Trigger>
								<Tooltip.Content>Undo {cmdOrCtrl} + z</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger
									class={buttonVariants({ variant: "ghost", size: "icon-sm" })}
									onclick={() => designSystem.redo()}
									disabled={!designSystem.canRedo}
								>
									<RedoIcon class="size-4" />
								</Tooltip.Trigger>
								<Tooltip.Content>Redo {cmdOrCtrl} + Z</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
					<Separator orientation="vertical" class="hidden xl:flex" />
					<LayoutToggle class="3xl:flex hidden" />
					<Separator orientation="vertical" class="3xl:flex hidden" />
					<ModeSwitcher />
					<Separator orientation="vertical" class="mr-0 -ml-2 sm:ml-0" />
					<Share />
					<InitializeDialog />
				</div>
			</div>
		</div>
	</header>
	<main class="flex flex-1 flex-col pb-16 sm:pb-0">
		<Sidebar.Provider
			class="flex h-auto min-h-min flex-1 flex-col items-start overflow-hidden px-0"
		>
			<div
				data-slot="designer"
				class="3xl:fixed:container flex w-full flex-1 flex-col gap-2 p-6 pt-1 pb-4 [--sidebar-width:--spacing(40)] sm:gap-2 sm:pt-2 md:flex-row md:pb-6 2xl:gap-6"
			>
				<ItemExplorer items={examples} />
				{@render children?.()}
				<Customizer />
			</div>
		</Sidebar.Provider>
		<WelcomeDialog />
	</main>
</div>
