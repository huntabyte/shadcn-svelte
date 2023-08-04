<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils";
	import type { Writable } from "svelte/store";

	export let href: string;
	export let open: Writable<boolean>;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	on:click={() => open.set(false)}
	class={cn(
		$page.url.pathname === href ? "text-foreground" : "text-foreground/60",
		className
	)}
	{...$$restProps}
>
	<slot />
</a>
