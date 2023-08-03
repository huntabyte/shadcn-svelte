<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, type CreateAvatar } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	export let delayMs: CreateAvatar["delayMs"] = undefined;
	export let loadingStatus: CreateAvatar["loadingStatus"] = undefined;
	export let onLoadingStatusChange: CreateAvatar["onLoadingStatusChange"] =
		undefined;

	ctx.set({ delayMs, loadingStatus, onLoadingStatusChange });
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
