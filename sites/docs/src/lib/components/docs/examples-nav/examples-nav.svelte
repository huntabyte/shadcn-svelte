<script lang="ts">
	import ExampleCodeLink from "./example-code-link.svelte";
	import { page } from "$app/state";
	import { examples } from "$lib/config/docs.js";
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";

	let { class: className, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<div class="relative">
	<ScrollArea orientation="both" scrollbarXClasses="invisible" class="mx-w-[600px] lg:max-w-none">
		<div class={cn("flex items-center", className)} {...restProps}>
			{@render ExampleLink({
				example: { name: "Examples", href: "/", code: "", hidden: false },
				isActive: page.url.pathname === "/",
			})}
			{#each examples as example (example.href)}
				{@render ExampleLink({
					example,
					isActive: page.url.pathname.startsWith(example.href),
				})}
			{/each}
		</div>
	</ScrollArea>

	<ExampleCodeLink />
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
			class="text-muted-foreground hover:text-primary data-[active=true]:bg-muted data-[active=true]:text-primary flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium transition-colors"
			data-active={isActive}
		>
			{example.name}
		</a>
	{/if}
{/snippet}
