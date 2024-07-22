<script lang="ts">
	import Blocks from "lucide-svelte/icons/blocks";
	import { Icons } from "./icons/index.js";
	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
	import { cn } from "$lib/utils.js";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	href="/docs/changelog"
	class={cn(
		"bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium",
		className
	)}
	{...$$restProps}
>
	<Blocks class="size-4" />
	<Separator class="mx-2 h-4" orientation="vertical" />
	<span>Introducing Lift Mode</span>
	<Icons.arrowRight class="ml-1 size-4" />
</a>
