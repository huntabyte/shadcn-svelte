<script lang="ts">
	import { onMount } from "svelte";
	import CopyButton from "$lib/components/copy-button.svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLPreElement> = $props();

	let preNode = $state<HTMLPreElement>();
	let code = $state("");

	onMount(() => {
		if (preNode) {
			code = preNode.innerText.trim().replaceAll("  ", " ");
		}
	});
</script>

<pre
	bind:this={preNode}
	class={cn(
		"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 py-4 dark:bg-zinc-900",
		className
	)}
	{...restProps}>
	{@render children?.()}
</pre>
<CopyButton text={code} class={cn("pre-copy-btn absolute right-4 top-4")} />
