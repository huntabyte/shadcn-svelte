<script lang="ts">
	import GalleryHorizontalIcon from "@lucide/svelte/icons/gallery-horizontal";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Button> = $props();
	const userConfig = UserConfigContext.get();
</script>

<Button
	variant="ghost"
	size="icon"
	class={cn("size-8", className)}
	onclick={() => {
		userConfig.setConfig({ layout: userConfig.current.layout === "full" ? "fixed" : "full" });
	}}
	{...restProps}
	title="Toggle layout"
>
	<span class="sr-only"> Toggle layout </span>
	<GalleryHorizontalIcon />
</Button>
