<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import { cn } from "cn";
	import * as Command from "$lib/registry/ui/command/index.js";
	import type { Model } from "../(data)/models.js";
	import type { Command as CommandPrimitive } from "bits-ui";

	type Props = {
		model: Model;
		isSelected: boolean;
		onSelect: () => void;
		onPeek: (model: Model) => void;
	} & CommandPrimitive.ItemProps;

	let { model, isSelected, onSelect, onPeek, ...restProps }: Props = $props();

	function mutationObserverAction(node: HTMLElement) {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type !== "attributes" || mutation.attributeName !== "aria-selected") continue;

				if (node.getAttribute("aria-selected") === "true") {
					onPeek(model);
				}
			}
		});

		observer.observe(node, {
			attributes: true,
		});
		return {
			destroy() {
				observer.disconnect();
			},
		};
	}
</script>

<Command.Item value={model.name} {onSelect} {...restProps}>
	{#snippet child({ props })}
		<div
			use:mutationObserverAction
			{...props}
			class="relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none aria-selected:bg-primary aria-selected:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
		>
			{model.name}
			{#if isSelected}
				<CheckIcon class={cn("ms-auto size-4")} />
			{/if}
		</div>
	{/snippet}
</Command.Item>
