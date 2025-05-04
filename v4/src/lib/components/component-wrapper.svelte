<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import ComponentErrorBoundary from "./component-error-boundary.svelte";
	import { cn, getComponentName } from "$lib/utils";
	import { Badge } from "$lib/registry/ui/badge";

	let {
		name,
		children,
		class: className,
		status = "in progress",
		...restProps
	}: HTMLAttributes<HTMLElement> & {
		name: string;
		status?: "in progress" | "done" | "needs parity" | "not started";
	} = $props();

	const statusVariant = {
		"in progress": "secondary",
		done: "default",
		"needs parity": "destructive",
		"not started": "outline",
	} as const;
</script>

<ComponentErrorBoundary {name}>
	<div
		id={name}
		data-name={name.toLowerCase()}
		class={cn("flex w-full scroll-mt-16 flex-col rounded-lg border", className)}
		{...restProps}
	>
		<div class="flex justify-between border-b px-4 py-3">
			<div class="text-sm font-medium">{getComponentName(name)}</div>
			<Badge variant={statusVariant[status]}>
				{status}
			</Badge>
		</div>
		<div class="flex flex-1 items-center gap-2 p-4">
			{@render children?.()}
		</div>
	</div>
</ComponentErrorBoundary>
