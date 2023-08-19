<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";
	import type { FormTextareaEvent } from ".";

	type $$Props = HTMLTextareaAttributes;
	type $$Events = {
		blur: FormTextareaEvent<FocusEvent>;
		change: FormTextareaEvent<Event>;
		click: FormTextareaEvent<MouseEvent>;
		focus: FormTextareaEvent<FocusEvent>;
		keydown: FormTextareaEvent<KeyboardEvent>;
		keypress: FormTextareaEvent<KeyboardEvent>;
		keyup: FormTextareaEvent<KeyboardEvent>;
		mouseover: FormTextareaEvent<MouseEvent>;
		mouseenter: FormTextareaEvent<MouseEvent>;
		mouseleave: FormTextareaEvent<MouseEvent>;
		paste: FormTextareaEvent<ClipboardEvent>;
		input: FormTextareaEvent<InputEvent>;
	};

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<textarea
	class={cn(
		"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
