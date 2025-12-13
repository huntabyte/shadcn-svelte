<script lang="ts">
	import Logo from "./logo.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import MainNav from "./main-nav.svelte";
	import Separator from "$lib/registry/ui/separator/separator.svelte";
	import GithubLink from "./github-link.svelte";
	import ModeSwitcher from "./mode-switcher.svelte";
	import MobileNav from "./mobile-nav.svelte";
	import LayoutToggle from "./layout-toggle.svelte";
	import CommandMenu from "./command-menu/command-menu.svelte";
	import { getColors } from "$lib/colors.js";
	import { mainNavItems } from "$lib/navigation.js";

	const colors = getColors();

	let mobileNavRef: { closeMenu: () => void } | undefined;

	function closeMobileMenu() {
		if (mobileNavRef) {
			mobileNavRef.closeMenu();
		}
	}
</script>

<header class="bg-background sticky top-0 z-50 w-full">
	<div class="container-wrapper 3xl:fixed:px-0 px-6">
		<div
			class="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:h-4!"
		>
			<MobileNav bind:this={mobileNavRef} class="flex lg:hidden" />
			<Button href="/" variant="ghost" size="icon" class="hidden size-8 lg:flex">
				<Logo class="size-5" />
				<span class="sr-only">shadcn-svelte</span>
			</Button>
			<MainNav items={mainNavItems} class="hidden lg:flex" />
			<div class="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
				<div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
					<CommandMenu {colors} {closeMobileMenu} />
				</div>
				<Separator orientation="vertical" class="ms-2 hidden lg:block" />
				<GithubLink />
				<Separator orientation="vertical" class="3xl:flex hidden" />
				<LayoutToggle class="3xl:flex hidden" />
				<Separator orientation="vertical" />
				<ModeSwitcher />
			</div>
		</div>
	</div>
</header>
