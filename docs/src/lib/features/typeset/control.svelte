<script lang="ts">
	import Lock from "@lucide/svelte/icons/lock-keyhole";
	import Unlock from "@lucide/svelte/icons/lock-keyhole-open";
	import type { LockableParam, TypesetState } from "./typeset.svelte.js";
	import { cn } from "$lib/utils.js";

	let {
		typeset,
		param,
		label,
		options,
		class: className,
		preview,
	}: {
		typeset: TypesetState;
		param: LockableParam;
		label: string;
		options: readonly { value: string; label: string }[];
		class?: string;
		preview?: string;
	} = $props();

	const value = $derived(typeset.params[param]);
	const current = $derived(options.find((option) => option.value === value));
</script>

<div class={cn("group/picker relative", className)}>
	<div
		class="ring-foreground/10 hover:bg-muted focus-within:ring-foreground/50 relative w-36 shrink-0 touch-manipulation rounded-xl p-3 ring-1 select-none md:w-full md:rounded-lg md:px-2.5 md:py-2"
	>
		<div class="flex min-w-0 flex-col justify-start pr-8 text-left">
			<div class="text-muted-foreground text-xs">{label}</div>
			<div class="text-foreground line-clamp-1 text-sm font-medium">{current?.label}</div>
		</div>
		{#if preview}
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5"
				style:font-family={preview}
			>Aa</div>
		{/if}
		<select
			aria-label={label}
			class="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
			value={value}
			onchange={(event) => typeset.update({ [param]: event.currentTarget.value })}
		>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</div>
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
