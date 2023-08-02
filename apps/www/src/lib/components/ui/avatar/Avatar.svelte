<script lang="ts">
	import { cn } from "$lib/utils";
	import type { CreateAvatarProps } from "@melt-ui/svelte";
	import { ctx } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = CreateAvatarProps & {
		class?: string;
	};
</script>

<div
	class={cn(
		"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
