<script lang="ts">
	import { cn } from "$lib/utils";
	import { alertVariants, type Variant } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: Variant = "default";
</script>

<div class={cn(alertVariants({ variant }), className)} {...$$restProps}>
	<slot />
</div>
