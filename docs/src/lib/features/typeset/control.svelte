<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock-keyhole";
	import Unlock from "@lucide/svelte/icons/lock-keyhole-open";
	import type { LockableParam, TypesetState } from "./typeset.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { Component } from "svelte";
	import { tick } from "svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import * as Picker from "./picker/index.js";
	import { useTypesetPreviewOverride } from "./preview-override.svelte.js";

	let {
		typeset,
		param,
		label,
		options,
		groups,
		class: className,
		preview,
		icon: Icon,
		anchor,
		scrollContainer,
	}: {
		typeset: TypesetState;
		param: LockableParam;
		label: string;
		options: readonly { value: string; label: string; menuLabel?: string }[];
		groups?: readonly {
			label: string;
			options: readonly { value: string; label: string; menuLabel?: string }[];
		}[];
		class?: string;
		preview?: string;
		icon?: Component;
		anchor?: HTMLElement | null;
		scrollContainer?: HTMLElement | null;
	} = $props();

	const isMobile = new IsMobile();
	const previewOverride = useTypesetPreviewOverride();
	let open = $state(false);
	const value = $derived(typeset.params[param]);
	const current = $derived(options.find((option) => option.value === value));
	const groupedValues = $derived(
		new Set(groups?.flatMap((group) => group.options.map((option) => option.value)) ?? [])
	);
	const ungroupedOptions = $derived(
		groups ? options.filter((option) => !groupedValues.has(option.value)) : []
	);

	$effect(() => {
		if (!open) previewOverride?.clear();
	});

	async function updateValue(next: string) {
		const scrollLeft = scrollContainer?.scrollLeft;
		typeset.update({ [param]: next });
		if (scrollLeft === undefined || !scrollContainer || !isMobile.current) return;

		let cancelled = false;
		const cancel = () => (cancelled = true);
		const restore = () => {
			if (!cancelled && scrollContainer) scrollContainer.scrollLeft = scrollLeft;
		};
		scrollContainer.addEventListener("pointerdown", cancel, { once: true });
		scrollContainer.addEventListener("touchstart", cancel, { once: true, passive: true });
		scrollContainer.addEventListener("wheel", cancel, { once: true, passive: true });
		await tick();
		restore();
		requestAnimationFrame(() => {
			restore();
			requestAnimationFrame(restore);
		});
		setTimeout(() => {
			scrollContainer?.removeEventListener("pointerdown", cancel);
			scrollContainer?.removeEventListener("touchstart", cancel);
			scrollContainer?.removeEventListener("wheel", cancel);
		}, 150);
	}
</script>

<div class={cn("group/picker relative", className)}>
	<Picker.Root submenu={false} bind:open>
		<Picker.Trigger submenu={false} class="w-36 md:w-full">
			<div class="flex min-w-0 flex-col justify-start pr-8 text-left">
				<div class="text-muted-foreground text-xs">{label}</div>
				<div class="text-foreground line-clamp-1 text-sm font-medium">{current?.label}</div>
			</div>
			{#if preview}
				<div
					class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5"
					style:font-family={preview}
				>
					Aa
				</div>
			{:else if Icon}
				<div
					class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center md:right-2.5"
				>
					<Icon class="size-4" />
				</div>
			{/if}
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
			customAnchor={isMobile.current ? anchor : undefined}
			class="cn-menu-translucent max-h-96 max-md:w-(--bits-dropdown-menu-anchor-width)"
			onmouseleave={() => previewOverride?.clear()}
		>
			<Picker.RadioGroup {value} onValueChange={updateValue}>
				{#if groups}
					{#if ungroupedOptions.length}
						<Picker.Group>
							{#each ungroupedOptions as option (option.value)}
								<Picker.RadioItem
									value={option.value}
									onItemPreview={isMobile.current
										? undefined
										: (next) => previewOverride?.set({ [param]: next })}
								>
									{option.menuLabel ?? option.label}
								</Picker.RadioItem>
							{/each}
						</Picker.Group>
						<Picker.Separator />
					{/if}
					{#each groups as group (group.label)}
						<Picker.Group>
							<Picker.Label>{group.label}</Picker.Label>
							{#each group.options as option (option.value)}
								<Picker.RadioItem
									value={option.value}
									onItemPreview={isMobile.current
										? undefined
										: (next) => previewOverride?.set({ [param]: next })}
								>
									{option.menuLabel ?? option.label}
								</Picker.RadioItem>
							{/each}
						</Picker.Group>
					{/each}
				{:else}
					{#each options as option (option.value)}
						<Picker.RadioItem
							value={option.value}
							onItemPreview={isMobile.current
								? undefined
								: (next) => previewOverride?.set({ [param]: next })}
						>
							{option.menuLabel ?? option.label}
						</Picker.RadioItem>
					{/each}
				{/if}
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	{#if open && !isMobile.current}
		<button
			type="button"
			aria-label="Close {label} menu"
			class="fixed inset-y-0 right-0 left-54 z-40 cursor-default bg-transparent"
			onclick={() => (open = false)}
		></button>
	{/if}
	<button
		type="button"
		title={typeset.locks.has(param) ? "Unlock" : "Lock"}
		aria-label={typeset.locks.has(param) ? "Unlock" : "Lock"}
		onclick={() => typeset.toggleLock(param)}
		class="ring-foreground/60 absolute top-1/2 right-8 z-20 hidden size-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity outline-none group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-[locked=true]:opacity-100 md:flex"
		data-locked={typeset.locks.has(param)}
	>
		{#if typeset.locks.has(param)}<Lock class="size-4" />{:else}<Unlock class="size-4" />{/if}
	</button>
</div>
