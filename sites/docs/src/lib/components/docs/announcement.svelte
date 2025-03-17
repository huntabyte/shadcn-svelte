<script lang="ts">
	import Blocks from "@lucide/svelte/icons/blocks";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a
	href="/docs/changelog"
	class={cn("group inline-flex items-center px-0.5 text-sm font-medium", className)}
	{...restProps}
>
	<Blocks class="size-4" />
	<Separator class="mx-2 h-4" orientation="vertical" />
	<span class="underline-offset-4 group-hover:underline"> npx shadcn-svelte init </span>
	<ArrowRight class="ml-1 size-4" />
</a>
