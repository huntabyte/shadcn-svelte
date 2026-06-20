<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		disabled = false,
		showTrigger = true,
		...restProps
	}: WithoutChild<ComboboxPrimitive.InputProps> & {
		showTrigger?: boolean;
		disabled?: boolean;
	} = $props();
</script>

<InputGroup.Root class={cn("w-auto", className)}>
	<ComboboxPrimitive.Input bind:ref {disabled} {...restProps}>
		{#snippet child({ props })}
			<InputGroup.Input {...props} {disabled} />
		{/snippet}
	</ComboboxPrimitive.Input>
	<InputGroup.Addon align="inline-end">
		{#if showTrigger}
			<ComboboxPrimitive.Trigger>
				{#snippet child({ props })}
					<InputGroup.Button
						{...props}
						size="icon-xs"
						variant="ghost"
						class="data-pressed:bg-transparent"
						{disabled}
					>
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconSelector"
							hugeicons="UnfoldMoreIcon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							class="pointer-events-none"
						/>
					</InputGroup.Button>
				{/snippet}
			</ComboboxPrimitive.Trigger>
		{/if}
	</InputGroup.Addon>
	{@render children?.()}
</InputGroup.Root>
