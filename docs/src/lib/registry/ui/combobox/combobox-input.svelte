<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import { COMBOBOX_CONTEXT, type ComboboxContext } from "./context.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		disabled = false,
		showTrigger = true,
		showClear = false,
		clearOnDeselect = true,
		...restProps
	}: WithoutChild<ComboboxPrimitive.InputProps> & {
		showTrigger?: boolean;
		showClear?: boolean;
		disabled?: boolean;
	} = $props();

	const combobox = getContext<ComboboxContext | undefined>(COMBOBOX_CONTEXT);
	let anchorRef = $state<HTMLDivElement | null>(null);
	const effectiveDisabled = $derived(disabled || !!combobox?.disabled);

	$effect(() => {
		if (showTrigger) {
			combobox?.setAnchor(anchorRef);
		}

		return () => {
			if (showTrigger) {
				combobox?.setAnchor(null);
			}
		};
	});

	function openCombobox() {
		if (effectiveDisabled) return;

		combobox?.setOpen(true);
	}
</script>

<InputGroup.Root bind:ref={anchorRef} class={cn("cn-combobox-input w-auto", className)}>
	<ComboboxPrimitive.Input bind:ref {clearOnDeselect} disabled={effectiveDisabled} {...restProps}>
		{#snippet child({ props })}
			<InputGroup.Input
				{...props}
				disabled={effectiveDisabled}
				onclick={(event) => {
					if (typeof props.onclick === "function") props.onclick(event);
					if (!event.defaultPrevented) openCombobox();
				}}
			/>
		{/snippet}
	</ComboboxPrimitive.Input>
	{#if showTrigger || showClear}
		<InputGroup.Addon align="inline-end">
			{#if showClear && combobox?.hasValue}
				<InputGroup.Button
					size="icon-xs"
					aria-label="Clear selection"
					disabled={effectiveDisabled}
					onclick={() => {
						combobox.clear();
						ref?.focus();
					}}
				>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
					/>
				</InputGroup.Button>
			{/if}
			{#if showTrigger}
				<ComboboxPrimitive.Trigger>
					{#snippet child({ props })}
						<InputGroup.Button
							{...props}
							size="icon-xs"
							variant="ghost"
							class="data-pressed:bg-transparent"
							aria-label="Toggle suggestions"
							disabled={effectiveDisabled}
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
	{/if}
	{@render children?.()}
</InputGroup.Root>
