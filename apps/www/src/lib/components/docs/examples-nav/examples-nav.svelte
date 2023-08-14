<script lang="ts">
	import { page } from "$app/stores";
	import { examples } from "$lib/config/docs";
	import { cn } from "$lib/utils";
	import ExampleCodeLink from "./example-code-link.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class="relative pb-4 sm:pb-0">
	<div class="max-w-[600px] lg:max-w-none">
		<div
			class={cn(
				"mb-4 flex items-center pb-2 overflow-x-auto sm:overflow-x-visible",
				className
			)}
			{...$$restProps}
		>
			{#each examples as example, index (index)}
				<a
					href={example.href}
					class={cn(
						"flex items-center px-4",
						$page.url.pathname.startsWith(example.href)
							? "font-bold text-primary"
							: "font-medium text-muted-foreground"
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
