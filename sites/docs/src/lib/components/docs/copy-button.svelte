<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/default/ui/button/index.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { cn } from "$lib/utils.js";
	import Copy from "@lucide/svelte/icons/copy";
	import Check from "@lucide/svelte/icons/check";
	import X from "@lucide/svelte/icons/x";
	import type { Snippet } from "svelte";
	import { scale } from "svelte/transition";

	// omit href so you can't create a link
	interface Props extends Omit<ButtonProps, "href"> {
		text: string;
		icon?: Snippet<[]>;
		animationDuration?: number;
		onCopy?: (status: UseClipboard["status"]) => void;
	}

	let {
		text,
		icon,
		animationDuration = 500,
		variant = "ghost",
		onCopy,
		class: className,
		...restProps
	}: Props = $props();

	const clipboard = new UseClipboard();
</script>

<Button
	{...restProps}
	{variant}
	size="icon"
	class={cn(className)}
	type="button"
	onclick={async () => {
		const status = await clipboard.copy(text);

		onCopy?.(status);
	}}
>
	{#if clipboard.status === "success"}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			<Check tabindex={-1} />
			<span class="sr-only">Copied</span>
		</div>
	{:else if clipboard.status === "failure"}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			<X tabindex={-1} />
			<span class="sr-only">Failed to copy</span>
		</div>
	{:else}
		<div in:scale={{ duration: animationDuration, start: 0.85 }}>
			{#if icon}
				{@render icon()}
			{:else}
				<Copy tabindex={-1} />
			{/if}
			<span class="sr-only">Copy</span>
		</div>
	{/if}
</Button>
