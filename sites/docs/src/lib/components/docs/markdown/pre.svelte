<script lang="ts">
	import { CopyButton } from "$lib/components/docs/index.js";
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();

	let codeString: string = $state("");

	function copyCodeToClipboard(node: HTMLPreElement) {
		codeString = node.innerText.trim() ?? "";
	}
</script>

<pre
	use:copyCodeToClipboard
	class={cn(
		"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
		className
	)}
	{...restProps}>
	{@render children?.()}
</pre>
<CopyButton value={codeString} class={cn("pre-copy-btn absolute right-4 top-4")} />
