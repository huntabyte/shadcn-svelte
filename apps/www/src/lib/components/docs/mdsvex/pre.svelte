<script lang="ts">
	import { CopyButton } from "$components/docs";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };

	let codeString: string;

	function copyCodeToClipboard(node: HTMLPreElement) {
		codeString = node.innerText.trim() ?? "";
	}
</script>

<pre
	use:copyCodeToClipboard
	class={cn(
		"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 data-[theme=dark]:bg-background data-[theme=light]:bg-white",
		className
	)}
	{...$$restProps}>
	<slot />
</pre>
<CopyButton
	value={codeString}
	class={cn("absolute right-4 top-4 pre-copy-btn")}
/>
