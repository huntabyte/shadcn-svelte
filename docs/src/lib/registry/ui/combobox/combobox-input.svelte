<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { getContext } from "svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { COMBOBOX_CONTEXT, type ComboboxContext } from "./context.js";

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

	const combobox = getContext<ComboboxContext | undefined>(COMBOBOX_CONTEXT);
	let anchorRef = $state<HTMLDivElement | null>(null);

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

	function handleFocus(event: FocusEvent, onFocus: unknown) {
		combobox?.setOpen(true);

		if (typeof onFocus === "function") {
			onFocus(event);
		}
	}
</script>

<InputGroup.Root
	bind:ref={anchorRef}
	class={cn("cn-combobox-input w-auto", className)}
	onpointerdown={() => combobox?.setOpen(true)}
>
	<ComboboxPrimitive.Input bind:ref {disabled} {...restProps}>
		{#snippet child({ props })}
			<InputGroup.Input
				{...props}
				{disabled}
				onfocus={(event) => {
					handleFocus(event, props.onfocus);
				}}
			/>
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
