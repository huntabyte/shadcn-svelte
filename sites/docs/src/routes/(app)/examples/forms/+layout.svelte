<script lang="ts">
	import type { Snippet } from "svelte";
	import SidebarNav from "./(components)/sidebar-nav.svelte";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";

	let { children }: { children?: Snippet } = $props();

	const sidebarNavItems = [
		{
			title: "Profile",
			href: "/examples/forms",
		},
		{
			title: "Account",
			href: "/examples/forms/account",
		},
		{
			title: "Appearance",
			href: "/examples/forms/appearance",
		},
		{
			title: "Notifications",
			href: "/examples/forms/notifications",
		},
		{
			title: "Display",
			href: "/examples/forms/display",
		},
	];
</script>

<div class="md:hidden">
	<img src="/img/examples/forms-light.png" alt="Forms" class="block dark:hidden" />
	<img src="/img/examples/forms-dark.png" alt="Forms" class="hidden dark:block" />
</div>
<div class="hidden space-y-6 p-10 pb-16 md:block">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">
			Manage your account settings and set e-mail preferences.
		</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			{@render children?.()}
		</div>
	</div>
</div>
