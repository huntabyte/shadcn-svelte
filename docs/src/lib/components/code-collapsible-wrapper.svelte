<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import type { ComponentProps } from "svelte";

	let {
		children,
		class: className,
		...restProps
	}: ComponentProps<typeof Collapsible.Root> = $props();

	let open = $state(false);
</script>

<Collapsible.Root
	bind:open
	class={cn("group/collapsible relative md:-mx-4", className)}
	{...restProps}
>
	<Collapsible.Trigger>
		{#snippet child({ props })}
			<div class="absolute top-1.5 right-9 z-10 flex items-center">
				<Button
					variant="ghost"
					size="sm"
					{...props}
					class="h-7 rounded-md px-2 text-muted-foreground"
				>
					{open ? "Collapse" : "Expand"}
				</Button>
				<Separator orientation="vertical" class="mx-1.5 h-4!" />
			</div>
		{/snippet}
	</Collapsible.Trigger>
	<Collapsible.Content
		forceMount
		class="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:mx-0!"
	>
		{@render children?.()}
	</Collapsible.Content>
	<Collapsible.Trigger
		class="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code text-sm text-muted-foreground group-data-[state=open]/collapsible:hidden"
	>
		{open ? "Collapse" : "Expand"}
	</Collapsible.Trigger>
</Collapsible.Root>
