<script lang="ts">
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	type Props = ComponentProps<typeof LoaderIcon>;

	let { class: className, ...restProps }: Props = $props();
</script>

<LoaderIcon
	role="status"
	aria-label="Loading"
	class={cn("size-4 animate-spin", className)}
	{...restProps}
/>
