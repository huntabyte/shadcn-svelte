<script lang="ts">
	import { page } from "$app/stores";
	import { examples } from "$lib/config/docs";
	import { cn } from "$lib/utils";
	import ExampleCodeLink from "./example-code-link.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="relative">
	<div class="lg:max-w-none">
		<!-- TODO: replace with srollarea component when it's ready -->
		<div
			class={cn(
				"mb-4 flex items-center overflow-y-auto pb-3 md:pb-0",
				className
			)}
			{...$$restProps}
		>
			{#each examples as example, index (index)}
				<a
					href={example.href}
					data-sveltekit-noscroll
					class={cn(
						"flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
						$page.url.pathname.startsWith(example.href) ||
							($page.url.pathname === "/" && index === 0)
							? "bg-muted font-medium text-primary"
							: "text-muted-foreground"
					)}
				>
					{example.name}{" "}
					{#if example.label}
						<span
							class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline"
						>
							{example.label}
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
	<ExampleCodeLink />
</div>
