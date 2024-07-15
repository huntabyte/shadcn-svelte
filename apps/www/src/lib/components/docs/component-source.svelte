<script lang="ts">
	import { CodeBlockWrapper } from "$lib/components/docs/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	let { class: className, children }: PrimitiveDivAttributes = $props();
</script>

<CodeBlockWrapper
	expandButtonTitle="Expand"
	class={cn("my-6 overflow-hidden rounded-md", className)}
>
	{@render children?.()}
</CodeBlockWrapper>
