<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";

	type ListItemProps = {
		title: string;
		href: string;
		description: string;
	};

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
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
					<li class="row-span-3">
						<NavigationMenu.Link>
							{#snippet child({ props })}
								<a
									class="from-muted/50 to-muted bg-linear-to-b outline-hidden flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline focus:shadow-md"
									href="/"
									{...props}
								>
									<div class="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
									<p class="text-muted-foreground text-sm leading-tight">
										Beautifully designed components built with Tailwind CSS.
									</p>
								</a>
							{/snippet}
						</NavigationMenu.Link>
					</li>

					{@render ListItem({
						title: "Introduction",
						href: "/docs",
						description: "Re-usable components built using Bits UI and Tailwind CSS.",
					})}

					{@render ListItem({
						title: "Installation",
						href: "/docs/installation",
						description: "How to install dependencies and structure your app.",
					})}

					{@render ListItem({
						title: "Typography",
						href: "/docs/typography",
						description: "Styles for headings, paragraphs, lists...etc",
					})}
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
					<a href="/docs" {...props}> Documentation </a>
				{/snippet}
			</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>

{#snippet ListItem({ title, href, description }: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child({ props })}
				<a {href} {...props}>
					<div class="text-sm font-medium leading-none">{title}</div>
					<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{description}
					</p>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}
