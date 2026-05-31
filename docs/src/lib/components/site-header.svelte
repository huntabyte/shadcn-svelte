<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import MainNav from "./main-nav.svelte";
	import Separator from "$lib/registry/ui/separator/separator.svelte";
	import GithubLink from "./github-link.svelte";
	import MobileNav from "./mobile-nav.svelte";
	import LayoutToggle from "./layout-toggle.svelte";
	import CommandMenu from "./command-menu/command-menu.svelte";
	import { getColors } from "$lib/colors.js";
	import { mainNavItems } from "$lib/navigation.js";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import Customizer from "./customizer.svelte";
	import { page } from "$app/state";
	import { InitializeProjectCtx } from "../../routes/(app)/(layout)/(create)/components/initialize-project-context.svelte.js";
	import ModeSwitcher from "./mode-switcher.svelte";

	const initializeProjectCtx = InitializeProjectCtx.getOr(null);

	const colors = getColors();

	let mobileNavRef: { closeMenu: () => void } | undefined;

	function closeMobileMenu() {
		if (mobileNavRef) {
			mobileNavRef.closeMenu();
		}
	}
</script>

<header class="bg-background sticky top-0 z-50 w-full">
	<div
		class="container-wrapper 3xl:fixed:px-0 px-6 group-has-data-[slot=designer]/layout:max-w-none"
	>
		<div
			class="group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:h-4!"
		>
			<MobileNav bind:this={mobileNavRef} class="flex lg:hidden" />

			<MainNav items={mainNavItems} class="hidden lg:flex" />
			<div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
				<div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
					<CommandMenu {colors} {closeMobileMenu} />
				</div>
				<Separator orientation="vertical" class="ml-2 hidden lg:block" />
				<GithubLink />
				<Separator orientation="vertical" class="3xl:flex hidden" />
				<LayoutToggle class="3xl:flex hidden" />
				<Separator orientation="vertical" />
				{#if page.url.pathname.startsWith("/create")}
					<ModeSwitcher class="md:hidden" />
					<Separator orientation="vertical" />
					{#if initializeProjectCtx}
						<Button
							onclick={() => (initializeProjectCtx.open = true)}
							variant="default"
							size="sm"
							class="hidden md:flex"
						>
							<SquareTerminal />
							Initialize Project
						</Button>
					{/if}
				{:else}
					<Customizer />
					<Button href="/create" variant="default" size="sm" class="h-[31px] rounded-lg">
						<PlusIcon />
						New
					</Button>
				{/if}
			</div>
		</div>
	</div>
</header>
