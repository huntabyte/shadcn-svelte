<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import type { ComponentProps } from "svelte";
	import { cn } from "$lib/utils.js";
	import GalleryHorizontalIcon from "@lucide/svelte/icons/gallery-horizontal";

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
