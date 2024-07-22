<script lang="ts">
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import ExampleCodeLink from "./example-code-link.svelte";
	import { page } from "$app/stores";
	import { examples } from "$lib/config/docs.js";
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/registry/new-york/ui/scroll-area/index.js";

	let className: string | undefined | null = undefined;
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});
</script>

<div class="relative">
	<div class="lg:max-w-none">
		<ScrollArea orientation="both" scrollbarXClasses="invisible">
			<div
				class={cn("mb-4 flex items-center overflow-y-auto pb-3 md:pb-0", className)}
				{...$$restProps}
			>
				{#each examples as example, index (index)}
					{@const isActive =
						$page.url.pathname.startsWith(example.href) ||
						($page.url.pathname === "/" && index === 0)}

					<a
						href={example.href}
						data-sveltekit-noscroll
						class={cn(
							"hover:text-primary relative flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors",
							isActive ? "text-primary font-medium" : "text-muted-foreground"
						)}
					>
						{#if isActive}
							<div
								class="bg-muted absolute inset-0 rounded-full"
								in:send={{ key: "activetab" }}
								out:receive={{ key: "activetab" }}
							/>
						{/if}
						<div class="relative">
							{example.name}
							{#if example.label}
								<span
									class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline"
								>
									{example.label}
								</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</ScrollArea>
	</div>

	<ExampleCodeLink />
</div>
