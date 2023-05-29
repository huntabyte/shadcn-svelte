<script lang="ts">
	import { CodeBlockWrapper } from "$components/docs";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CodeBlockWrapper
	expandButtonTitle="Expand"
	class={cn("my-6 overflow-hidden rounded-md", className)}
>
	<slot />
</CodeBlockWrapper>
