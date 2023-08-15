<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	type $$Props = HTMLInputAttributes;
	type $$Events = {
		blur: FocusEvent;
		change: Event;
		click: MouseEvent;
		focus: FocusEvent;
		keydown: KeyboardEvent;
		keypress: KeyboardEvent;
		keyup: KeyboardEvent;
		mouseover: MouseEvent;
		mouseenter: MouseEvent;
		mouseleave: MouseEvent;
		paste: ClipboardEvent;
		input: Event;
	};

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<input
	class={cn(
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
/>
