<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import { alertVariants, type Variant } from ".";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
</script>

<div
	class={cn(alertVariants({ variant }), className)}
	{...$$restProps}
	role="alert"
>
	<slot />
</div>
