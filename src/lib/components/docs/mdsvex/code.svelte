<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";

	let className: string | undefined | null = undefined;
	export { className as class };
	type $$Props = HTMLAttributes<HTMLElement>;
</script>

<code
	class={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
	{...$$restProps}
>
	<slot />
</code>
