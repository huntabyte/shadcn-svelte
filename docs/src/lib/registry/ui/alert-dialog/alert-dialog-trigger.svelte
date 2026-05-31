<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		child: childProp,
		children,
		...restProps
	}: AlertDialogPrimitive.TriggerProps & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	} = $props();
</script>

<AlertDialogPrimitive.Trigger bind:ref data-slot="alert-dialog-trigger" {...restProps}>
	{#snippet child({ props })}
		{#if childProp}
			{@render childProp({ props })}
		{:else}
			<button {...props}>
				{@render children?.()}
			</button>
		{/if}
	{/snippet}
</AlertDialogPrimitive.Trigger>
