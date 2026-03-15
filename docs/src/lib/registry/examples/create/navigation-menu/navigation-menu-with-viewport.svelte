<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";

	const components: { title: string; href: string; description: string }[] = [
		{
			title: "Alert Dialog",
			href: "/docs/primitives/alert-dialog",
			description:
				"A modal dialog that interrupts the user with important content and expects a response.",
		},
		{
			title: "Hover Card",
			href: "/docs/primitives/hover-card",
			description: "For sighted users to preview content available behind a link.",
		},
		{
			title: "Progress",
			href: "/docs/primitives/progress",
			description:
				"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
		},
		{
			title: "Scroll-area",
			href: "/docs/primitives/scroll-area",
			description: "Visually or semantically separates content.",
		},
		{
			title: "Tabs",
			href: "/docs/primitives/tabs",
			description:
				"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
		},
		{
			title: "Tooltip",
			href: "/docs/primitives/tooltip",
			description:
				"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
		},
	];
</script>

{#snippet ListItem({
	title,
	href,
	description,
}: {
	title: string;
	href: string;
	description: string;
})}
	<li>
		<NavigationMenu.Link>
			{#snippet child({ props })}
				<a {...props} {href}>
					<div class="flex flex-col gap-1 text-sm">
						<div class="leading-none font-medium">{title}</div>
						<div class="text-muted-foreground line-clamp-2">
							{description}
						</div>
					</div>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<Example title="With Viewport">
	<NavigationMenu.Root>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="w-96">
						{@render ListItem({
							title: "Introduction",
							href: "/docs",
							description: "Re-usable components built with Tailwind CSS.",
						})}
						{@render ListItem({
							title: "Installation",
							href: "/docs/installation",
							description: "How to install dependencies and structure your app.",
						})}
						{@render ListItem({
							title: "Typography",
							href: "/docs/primitives/typography",
							description: "Styles for headings, paragraphs, lists...etc",
						})}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[400px] gap-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						{#each components as component (component.title)}
							{@render ListItem({
								title: component.title,
								href: component.href,
								description: component.description,
							})}
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link class={navigationMenuTriggerStyle()}>
					{#snippet child({ props })}
						<a {...props} href="/docs">Documentation</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</Example>
