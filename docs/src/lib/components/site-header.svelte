<script lang="ts">
	import { page } from "$app/state";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import Separator from "$lib/registry/ui/separator/separator.svelte";
	import { getColors } from "$lib/colors.js";
	import { mainNavItems } from "$lib/navigation.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import CommandMenu from "./command-menu/command-menu.svelte";
	import Customizer from "./customizer.svelte";
	import GithubLink from "./github-link.svelte";
	import LayoutToggle from "./layout-toggle.svelte";
	import MainNav from "./main-nav.svelte";
	import MobileNav from "./mobile-nav.svelte";
	import ModeSwitcher from "./mode-switcher.svelte";
	import ProjectForm from "../../routes/(app)/(layout)/create/components/project-form.svelte";

	const colors = getColors();

	let mobileNavRef: { closeMenu: () => void } | undefined;

	function closeMobileMenu() {
		if (mobileNavRef) {
			mobileNavRef.closeMenu();
		}
	}
</script>

<header class="sticky top-0 z-50 w-full bg-background">
	<div
		class="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0"
	>
		<div
			class="flex h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container"
		>
			<MobileNav bind:this={mobileNavRef} class="flex lg:hidden" />

			<MainNav items={mainNavItems} class="hidden lg:flex" />
			<div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
				<div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
					<CommandMenu {colors} {closeMobileMenu} />
				</div>
				<Separator orientation="vertical" class="ml-2 hidden lg:block" />
				<GithubLink />
				<Separator orientation="vertical" class="hidden 3xl:flex" />
				<LayoutToggle class="hidden 3xl:flex" />
				<Separator orientation="vertical" />
				{#if page.url.pathname.startsWith("/create")}
					<ModeSwitcher />
					<Separator orientation="vertical" class="hidden md:flex" />
					<ProjectForm class="hidden h-[31px] rounded-lg md:flex" />
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
