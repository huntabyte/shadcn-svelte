<script lang="ts">
	import Blocks from "lucide-svelte/icons/blocks";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { Icons } from "./icons/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	href="/docs/changelog"
	class={cn(
		"inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium",
		className
	)}
	{...restProps}
>
	<Blocks class="size-4" />
	<Separator class="mx-2 h-4" orientation="vertical" />
	<span>Introducing Lift Mode</span>
	<Icons.arrowRight class="ml-1 size-4" />
</a>
