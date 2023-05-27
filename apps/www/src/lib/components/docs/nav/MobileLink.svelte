<script lang="ts">
	import { cn } from "$lib/utils";

	export let href: string;
	export let open: boolean;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	on:click={() => (open = false)}
	class={cn(className)}
	{...$$restProps}
>
	<slot />
</a>
