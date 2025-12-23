<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

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

<Example title="Basic">
	<NavigationMenu.Root>
		<NavigationMenu.List>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Getting started</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="w-96">
						<li>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="/docs" {...props}>
										<div
											class="style-vega:text-sm style-maia:text-sm style-nova:text-sm style-lyra:text-xs style-mira:text-xs flex flex-col gap-1"
										>
											<div class="leading-none font-medium">Introduction</div>
											<div class="text-muted-foreground line-clamp-2">
												Re-usable components built with Tailwind CSS.
											</div>
										</div>
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</li>
						<li>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="/docs/installation" {...props}>
										<div
											class="style-vega:text-sm style-maia:text-sm style-nova:text-sm style-lyra:text-xs style-mira:text-xs flex flex-col gap-1"
										>
											<div class="leading-none font-medium">Installation</div>
											<div class="text-muted-foreground line-clamp-2">
												How to install dependencies and structure your app.
											</div>
										</div>
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</li>
						<li>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="/docs/primitives/typography" {...props}>
										<div
											class="style-vega:text-sm style-maia:text-sm style-nova:text-sm style-lyra:text-xs style-mira:text-xs flex flex-col gap-1"
										>
											<div class="leading-none font-medium">Typography</div>
											<div class="text-muted-foreground line-clamp-2">
												Styles for headings, paragraphs, lists...etc
											</div>
										</div>
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</li>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						{#each components as component (component.title)}
							<li>
								<NavigationMenu.Link>
									{#snippet child({ props })}
										<a href={component.href} {...props}>
											<div
												class="style-vega:text-sm style-maia:text-sm style-nova:text-sm style-lyra:text-xs style-mira:text-xs flex flex-col gap-1"
											>
												<div class="leading-none font-medium">
													{component.title}
												</div>
												<div class="text-muted-foreground line-clamp-2">
													{component.description}
												</div>
											</div>
										</a>
									{/snippet}
								</NavigationMenu.Link>
							</li>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[200px]">
						<li>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="#/" class="flex-row items-center gap-2" {...props}>
										<IconPlaceholder
											lucide="CircleAlertIcon"
											tabler="IconExclamationCircle"
											hugeicons="AlertCircleIcon"
											phosphor="WarningCircleIcon"
										/>
										Backlog
									</a>
								{/snippet}
							</NavigationMenu.Link>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="#/" class="flex-row items-center gap-2" {...props}>
										<IconPlaceholder
											lucide="CircleAlertIcon"
											tabler="IconExclamationCircle"
											hugeicons="AlertCircleIcon"
											phosphor="WarningCircleIcon"
										/>
										To Do
									</a>
								{/snippet}
							</NavigationMenu.Link>
							<NavigationMenu.Link>
								{#snippet child({ props })}
									<a href="#/" class="flex-row items-center gap-2" {...props}>
										<IconPlaceholder
											lucide="CircleAlertIcon"
											tabler="IconExclamationCircle"
											hugeicons="AlertCircleIcon"
											phosphor="WarningCircleIcon"
										/>
										Done
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</li>
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
			<NavigationMenu.Item>
				<NavigationMenu.Link>
					{#snippet child({ props })}
						<a href="/docs" class={navigationMenuTriggerStyle()} {...props}>
							Documentation
						</a>
					{/snippet}
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</Example>
