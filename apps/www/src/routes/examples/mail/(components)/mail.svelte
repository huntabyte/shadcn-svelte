<script lang="ts">
	import AccountSwitcher from "./account-switcher.svelte";
	import { primaryRoutes, secondaryRoutes } from "../config.js";
	import MailDisplay from "./mail-display.svelte";
	import MailList from "./mail-list.svelte";
	import Nav from "./nav.svelte";
	import { mailStore } from "../store.js";
	import { cn } from "@/utils";
	import { Input } from "@/registry/new-york/ui/input";
	import * as Resizable from "@/registry/new-york/ui/resizable";
	import { Separator } from "@/registry/new-york/ui/select";
	import * as Tabs from "@/registry/new-york/ui/tabs";
	import Search from "lucide-svelte/icons/search";
	import type { Account, Mail } from "../data.js";

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	let isCollapsed = defaultCollapsed;

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}
</script>

<Resizable.PaneGroup
	direction="horizontal"
	{onLayoutChange}
	class="h-full max-h-[800px] items-stretch"
>
	<Resizable.Pane
		defaultSize={defaultLayout[0]}
		collapsedSize={navCollapsedSize}
		collapsible
		minSize={15}
		maxSize={20}
		{onCollapse}
		{onExpand}
	>
		<div
			class={cn(
				"flex h-[52px] items-center justify-center",
				isCollapsed ? "h-[52px]" : "px-2"
			)}
		>
			<AccountSwitcher {isCollapsed} {accounts} />
		</div>
		<Separator />
		<Nav {isCollapsed} routes={primaryRoutes} />
		<Separator />
		<Nav {isCollapsed} routes={secondaryRoutes} />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
		<Tabs.Root value="all">
			<div class="flex items-center px-4 py-2">
				<h1 class="text-xl font-bold">Inbox</h1>
				<Tabs.List class="ml-auto">
					<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">
						All mail
					</Tabs.Trigger>
					<Tabs.Trigger value="unread" class="text-zinc-600 dark:text-zinc-200">
						Unread
					</Tabs.Trigger>
				</Tabs.List>
			</div>
			<Separator />
			<div
				class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
			>
				<form>
					<div class="relative">
						<Search class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
						<Input placeholder="Search" class="pl-8" />
					</div>
				</form>
			</div>
			<Tabs.Content value="all" class="m-0">
				<MailList items={mails} />
			</Tabs.Content>
			<Tabs.Content value="unread" class="m-0">
				<MailList items={mails.filter((item) => !item.read)} />
			</Tabs.Content>
		</Tabs.Root>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={defaultLayout[2]}>
		<MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} />
	</Resizable.Pane>
</Resizable.PaneGroup>
