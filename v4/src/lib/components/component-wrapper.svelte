<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import ComponentErrorBoundary from "./component-error-boundary.svelte";
	import { cn, getComponentName } from "$lib/utils";

	let {
		name,
		children,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLElement> & { name: string } = $props();
</script>

<ComponentErrorBoundary {name}>
	<div
		id={name}
		data-name={name.toLowerCase()}
		class={cn("flex w-full scroll-mt-16 flex-col rounded-lg border", className)}
		{...restProps}
	>
		<div class="border-b px-4 py-3">
			<div class="text-sm font-medium">{getComponentName(name)}</div>
		</div>
		<div class="flex flex-1 items-center gap-2 p-4">{children}</div>
	</div>
</ComponentErrorBoundary>
