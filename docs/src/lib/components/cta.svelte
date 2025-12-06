<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let { class: className }: { class?: string } = $props();
</script>

<div
	class={cn(
		"bg-surface text-surface-foreground group relative flex flex-col gap-2 rounded-lg p-6 text-sm",
		className
	)}
>
	<div class="text-base leading-tight font-semibold text-balance group-hover:underline">
		Special sponsor
	</div>
	<div class="text-muted-foreground">We're looking for one partner to be featured here.</div>
	<div class="text-muted-foreground">Support the project and reach thousands of developers.</div>
	<Button size="sm" class="mt-2 w-fit" href="mailto:sponsorship@huntabyte.com">Reach out</Button>
</div>
