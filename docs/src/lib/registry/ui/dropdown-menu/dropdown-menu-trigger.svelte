<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		child: childProp,
		children,
		...restProps
	}: DropdownMenuPrimitive.TriggerProps & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();
</script>

<DropdownMenuPrimitive.Trigger bind:ref data-slot="dropdown-menu-trigger" {...restProps}>
	{#snippet child({ props })}
		{#if childProp}
			{@render childProp({ props })}
		{:else}
			<button {...props}>
				{@render children?.()}
			</button>
		{/if}
	{/snippet}
</DropdownMenuPrimitive.Trigger>
