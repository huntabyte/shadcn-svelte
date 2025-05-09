<script lang="ts">
	import ChartLine from "@lucide/svelte/icons/chart-line";
	import File from "@lucide/svelte/icons/file";
	import Home from "@lucide/svelte/icons/home";
	import LifeBuoy from "@lucide/svelte/icons/life-buoy";
	import Send from "@lucide/svelte/icons/send";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import ShoppingBag from "@lucide/svelte/icons/shopping-bag";
	import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
	import User from "@lucide/svelte/icons/user";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import NavMain from "./nav-main.svelte";
	import NavSecondary from "./nav-secondary.svelte";
	import type { ComponentProps } from "svelte";

	let { ...props }: ComponentProps<typeof Sidebar.Root> = $props();

	const data = {
		navMain: [
			{
				title: "Dashboard",
				url: "/dashboard",
				icon: Home,
			},
			{
				title: "Analytics",
				url: "/dashboard/analytics",
				icon: ChartLine,
			},
			{
				title: "Orders",
				url: "/dashboard/orders",
				icon: ShoppingBag,
			},
			{
				title: "Products",
				url: "/dashboard/products",
				icon: ShoppingCart,
			},
			{
				title: "Invoices",
				url: "/dashboard/invoices",
				icon: File,
			},
			{
				title: "Customers",
				url: "/dashboard/customers",
				icon: User,
			},
			{
				title: "Settings",
				url: "/dashboard/settings",
				icon: Settings2,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
			{
				title: "Feedback",
				url: "#",
				icon: Send,
			},
		],
	};
</script>

<Sidebar.Root class="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
</Sidebar.Root>
