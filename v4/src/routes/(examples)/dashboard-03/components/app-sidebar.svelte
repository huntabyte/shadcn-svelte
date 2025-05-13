<script lang="ts">
	import ChartLineIcon from "@lucide/svelte/icons/chart-line";
	import FileIcon from "@lucide/svelte/icons/file";
	import HomeIcon from "@lucide/svelte/icons/home";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import SendIcon from "@lucide/svelte/icons/send";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import ShoppingBagIcon from "@lucide/svelte/icons/shopping-bag";
	import ShoppingCartIcon from "@lucide/svelte/icons/shopping-cart";
	import UserIcon from "@lucide/svelte/icons/user";
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
				icon: HomeIcon,
			},
			{
				title: "Analytics",
				url: "/dashboard/analytics",
				icon: ChartLineIcon,
			},
			{
				title: "Orders",
				url: "/dashboard/orders",
				icon: ShoppingBagIcon,
			},
			{
				title: "Products",
				url: "/dashboard/products",
				icon: ShoppingCartIcon,
			},
			{
				title: "Invoices",
				url: "/dashboard/invoices",
				icon: FileIcon,
			},
			{
				title: "Customers",
				url: "/dashboard/customers",
				icon: UserIcon,
			},
			{
				title: "Settings",
				url: "/dashboard/settings",
				icon: Settings2Icon,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoyIcon,
			},
			{
				title: "Feedback",
				url: "#",
				icon: SendIcon,
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
