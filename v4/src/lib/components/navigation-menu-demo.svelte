<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import ListItem from "$lib/components/list-item.svelte";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu";

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

<div class="@xl:flex hidden w-full flex-col items-center justify-center gap-6">
	<NavigationMenu.Root>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						<li class="row-span-3">
							<NavigationMenu.Link>
								{#snippet child()}
									<a
										class="from-muted/50 to-muted bg-linear-to-b outline-hidden flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline focus:shadow-md"
										href="/"
									>
										<div class="mb-2 mt-4 text-lg font-medium">
											shadcn-svelte
										</div>
										<p class="text-muted-foreground text-sm leading-tight">
											Beautifully designed components built with Tailwind CSS.
										</p>
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</li>
						<ListItem href="/docs" title="Introduction">
							Re-usable components built using Bits UI and Tailwind CSS.
						</ListItem>
						<ListItem href="/docs/installation" title="Installation">
							How to install dependencies and structure your app.
						</ListItem>
						<ListItem href="/docs/primitives/typography" title="Typography">
							Styles for headings, paragraphs, lists...etc
						</ListItem>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						{#each components as component (component.title)}
							<ListItem title={component.title} href={component.href}>
								{component.description}
							</ListItem>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<a href="/docs">
					<NavigationMenu.Link class={navigationMenuTriggerStyle()}>
						Documentation
					</NavigationMenu.Link>
				</a>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</div>
