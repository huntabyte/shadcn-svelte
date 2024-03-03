<script lang="ts">
	import { cn } from "$lib/utils.js";
	export let href: string;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	class={cn(
		"flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
		className
	)}
>
	<slot />
</a>
