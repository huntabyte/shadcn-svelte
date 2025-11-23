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
	class={cn("group/collapsible relative md:-mx-1", className)}
	{...restProps}
>
	<Collapsible.Trigger>
		{#snippet child({ props })}
			<div class="absolute end-9 top-1.5 z-10 flex items-center">
				<Button
					variant="ghost"
					size="sm"
					{...props}
					class="text-muted-foreground h-7 rounded-md px-2"
				>
					{open ? "Collapse" : "Expand"}
				</Button>
				<Separator orientation="vertical" class="mx-1.5 !h-4" />
			</div>
		{/snippet}
	</Collapsible.Trigger>
	<Collapsible.Content
		forceMount
		class="relative mt-6 overflow-hidden data-[state=closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0"
	>
		{@render children?.()}
	</Collapsible.Content>
	<Collapsible.Trigger
		class="from-code/70 to-code text-muted-foreground absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b text-sm group-data-[state=open]/collapsible:hidden"
	>
		{open ? "Collapse" : "Expand"}
	</Collapsible.Trigger>
</Collapsible.Root>
