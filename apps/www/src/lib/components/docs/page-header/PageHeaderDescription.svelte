<script lang="ts">
	import Balancer from "svelte-wrap-balancer";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn(
		"max-w-[750px] text-lg text-muted-foreground sm:text-xl",
		className
	)}
	{...$$restProps}
>
	<Balancer>
		<slot />
	</Balancer>
</p>
