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

<!--
We cannot have a newline between the pre and children or we will get a newline in the code block
-->
<pre
	bind:this={preNode}
	class={cn(
		"no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0",
		className
	)}
	{...restProps}>{@render children?.()}</pre>
<CopyButton text={code} />
