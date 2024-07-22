<script lang="ts">
	import { CodeBlockWrapper } from "$lib/components/docs/index.js";
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CodeBlockWrapper
	expandButtonTitle="Expand"
	class={cn("my-6 overflow-hidden rounded-md", className)}
>
	<slot />
</CodeBlockWrapper>
