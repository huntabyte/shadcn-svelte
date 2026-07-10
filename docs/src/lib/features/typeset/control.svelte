<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock-keyhole";
	import Unlock from "@lucide/svelte/icons/lock-keyhole-open";
	import type { LockableParam, TypesetState } from "./typeset.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { Component } from "svelte";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import * as Picker from "./picker/index.js";

	let {
		typeset,
		param,
		label,
		options,
		class: className,
		preview,
		icon: Icon,
	}: {
		typeset: TypesetState;
		param: LockableParam;
		label: string;
		options: readonly { value: string; label: string }[];
		class?: string;
		preview?: string;
		icon?: Component;
	} = $props();

	const isMobile = new IsMobile();
	let open = $state(false);
	const value = $derived(typeset.params[param]);
	const current = $derived(options.find((option) => option.value === value));
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
			class="cn-menu-translucent max-h-96"
		>
			<Picker.RadioGroup {value} onValueChange={(next) => typeset.update({ [param]: next })}>
				{#each options as option (option.value)}
					<Picker.RadioItem value={option.value} closeOnSelect={isMobile.current}>
						{option.label}
					</Picker.RadioItem>
				{/each}
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	{#if open}
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
