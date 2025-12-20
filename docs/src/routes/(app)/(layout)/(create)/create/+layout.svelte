<script lang="ts">
	import LayoutToggle from "$lib/components/layout-toggle.svelte";
	import ModeSwitcher from "$lib/components/mode-switcher.svelte";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import ShareIcon from "@lucide/svelte/icons/share";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import ItemExplorer from "../components/item-explorer.svelte";
	import WelcomeDialog from "../components/welcome-dialog.svelte";
	import Customizer from "../components/customizer.svelte";
	import { examples } from "$lib/registry/examples/create/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import InitializeDialog from "../components/initialize-dialog.svelte";

	let { children } = $props();

	const clipboard = new UseClipboard();

	const designSystem = useDesignSystem();
</script>

<div data-slot="layout" class="section-soft relative z-10 flex min-h-svh flex-col">
	<header class="bg-background sticky top-0 z-50 w-full">
		<div class="container-wrapper 3xl:fixed:px-0 px-6">
			<div
				class="3xl:fixed:container flex h-(--header-height) items-center justify-evenly **:data-[slot=separator]:h-4!"
			>
				<div class="flex items-center gap-4 xl:w-1/3">
					<Button href="/" variant="outline" size="sm">
						<ArrowLeftIcon />
						Back
					</Button>
					<Separator orientation="vertical" />
					<span class="text-muted-foreground text-sm font-medium">New Project</span>
				</div>
				<div
					class="fixed inset-x-0 bottom-0 ml-auto flex flex-1 items-center gap-2 px-4.5 pb-4 sm:static sm:justify-end sm:p-0 lg:ml-0 xl:justify-center"
				>
					<InputGroup.Root>
						<InputGroup.Input placeholder="Vercel" />
						<InputGroup.Addon align="inline-end">
							<SearchIcon />
						</InputGroup.Addon>
					</InputGroup.Root>
				</div>
				<div
					class="ms-auto flex items-center gap-2 sm:ml-0 md:justify-end xl:ml-auto xl:w-1/3"
				>
					<LayoutToggle class="3xl:flex hidden" />
					<Separator orientation="vertical" />
					<ModeSwitcher />
					<Separator orientation="vertical" />
					<Tooltip.Provider disableCloseOnTriggerClick>
						<Tooltip.Root>
							<Tooltip.Trigger
								class={buttonVariants({ variant: "outline", size: "sm" })}
								onclick={() => clipboard.copy(designSystem.shareUrl)}
							>
								{#if clipboard.copied}
									<CheckIcon />
								{:else}
									<ShareIcon />
								{/if}
								Share
							</Tooltip.Trigger>
							<Tooltip.Content>
								{clipboard.copied ? "Copied link" : "Copy link"}
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
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
