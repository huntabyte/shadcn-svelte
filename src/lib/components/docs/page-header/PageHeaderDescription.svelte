<script lang="ts">
	import { balancer } from "svelte-action-balancer";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	use:balancer
	class={cn("flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12", className)}
	{...$$restProps}
>
	<slot />
</p>
