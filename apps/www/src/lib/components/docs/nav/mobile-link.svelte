<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "$lib/utils.js";

	export let href: string;
	export let open: boolean;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	class={cn($page.url.pathname === href ? "text-foreground" : "text-foreground/60", className)}
	on:click={() => (open = false)}
	{...$$restProps}
>
	<slot />
</a>
