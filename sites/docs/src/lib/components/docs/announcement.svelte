<script lang="ts">
	import Blocks from "lucide-svelte/icons/blocks";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import ArrowRight from "svelte-radix/ArrowRight.svelte";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	href="/docs/changelog"
	class={cn(
		"bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium",
		className
	)}
	{...restProps}
>
	<Blocks class="size-4" />
	<Separator class="mx-2 h-4" orientation="vertical" />
	<span>Introducing Lift Mode</span>
	<ArrowRight class="ml-1 size-4" />
</a>
