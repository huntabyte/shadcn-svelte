<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import CopyButton from "../CopyButton.svelte";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let __rawString__: string | undefined = undefined;
	export let __withMeta__: string | undefined = undefined;

	type $$Props = HTMLAttributes<HTMLPreElement>;
</script>

<pre
	class={cn(
		"mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 data-[theme=dark]:bg-background data-[theme=light]:bg-white",
		className
	)}
	{...$$restProps}>
    <CopyButton
		value={__rawString__}
		class={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
	/>
	<slot />
</pre>
