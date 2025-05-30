<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { page } from "$app/state";
	import ScrollArea from "$lib/registry/ui/scroll-area/scroll-area.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	const examples = [
		{
			name: "Dashboard",
			href: "/examples/dashboard",
			code: "https://github.com/shadcn/ui/tree/main/apps/v4/app/(app)/examples/dashboard",
			hidden: false,
		},
		{
			name: "Tasks",
			href: "/examples/tasks",
			code: "https://github.com/shadcn/ui/tree/main/apps/v4/app/(app)/examples/tasks",
			hidden: false,
		},
		{
			name: "Playground",
			href: "/examples/playground",
			code: "https://github.com/shadcn/ui/tree/main/apps/v4/app/(app)/examples/playground",
			hidden: false,
		},
		{
			name: "Authentication",
			href: "/examples/authentication",
			code: "https://github.com/shadcn/ui/tree/main/apps/v4/app/(app)/examples/authentication",
			hidden: false,
		},
	];

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div class={cn("flex items-center", className)} {...restProps}>
	<ScrollArea class="max-w-[96%] md:max-w-[600px] lg:max-w-none" orientation="both">
		<div class="flex items-center">
			{@render ExampleLink({
				example: { name: "Examples", href: "/", code: "", hidden: false },
				isActive: page.url.pathname === "/",
			})}
			{#each examples as example (example.href)}
				{@render ExampleLink({
					example,
					isActive: page.url.pathname?.startsWith(example.href) ?? false,
				})}
			{/each}
		</div>
	</ScrollArea>
</div>

{#snippet ExampleLink({
	example,
	isActive,
}: {
	example: (typeof examples)[number];
	isActive: boolean;
})}
	{#if !example.hidden}
		<a
			href={example.href}
			class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
			data-active={isActive}
		>
			{example.name}
		</a>
	{/if}
{/snippet}
