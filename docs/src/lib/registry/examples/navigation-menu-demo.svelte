<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { cn } from "$lib/utils.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	const components: { title: string; href: string; description: string }[] = [
		{
			title: "Alert Dialog",
			href: "/docs/components/alert-dialog",
			description:
				"A modal dialog that interrupts the user with important content and expects a response.",
		},
		{
			title: "Hover Card",
			href: "/docs/components/hover-card",
			description: "For sighted users to preview content available behind a link.",
		},
		{
			title: "Progress",
			href: "/docs/components/progress",
			description:
				"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
		},
		{
			title: "Scroll-area",
			href: "/docs/components/scroll-area",
			description: "Visually or semantically separates content.",
		},
		{
			title: "Tabs",
			href: "/docs/components/tabs",
			description:
				"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
		},
		{
			title: "Tooltip",
			href: "/docs/components/tooltip",
			description:
				"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
		},
	];

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};
</script>

{#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
						className
					)}
					{...restProps}
				>
					<div class="flex flex-col gap-1 text-sm">
						<div class="leading-none font-medium">{title}</div>
						<div class="text-muted-foreground line-clamp-2">{content}</div>
					</div>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="w-96">
					{@render ListItem({
						href: "/docs",
						title: "Introduction",
						content: "Re-usable components built with Tailwind CSS.",
					})}
					{@render ListItem({
						href: "/docs/installation",
						title: "Installation",
						content: "How to install dependencies and structure your app.",
					})}
					{@render ListItem({
						href: "/docs/components/typography",
						title: "Typography",
						content: "Styles for headings, paragraphs, lists...etc",
					})}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item class="hidden md:flex">
			<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					{#each components as component, i (i)}
						{@render ListItem({
							href: component.href,
							title: component.title,
							content: component.description,
						})}
					{/each}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Link>
				{#snippet child()}
					<a href="/docs" class={navigationMenuTriggerStyle()}>Docs</a>
				{/snippet}
			</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
