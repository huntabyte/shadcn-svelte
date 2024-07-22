<script lang="ts">
	import { cn } from "$lib/utils.js";
	export let href: string;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	class={cn(
		"bg-card text-card-foreground hover:bg-muted/50 flex w-full flex-col items-center rounded-xl border p-6 shadow transition-colors sm:p-10",
		className
	)}
>
	<slot />
</a>
