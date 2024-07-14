<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { type AlertVariant, alertVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: AlertVariant;
	};

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export { className as class };
</script>

<div class={cn(alertVariants({ variant }), className)} {...$$restProps} role="alert">
	<slot />
</div>
