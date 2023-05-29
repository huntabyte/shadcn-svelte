<script lang="ts">
	import { Dialog as DialogPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<DialogPrimitive.Portal class={cn(className)} {...$$restProps}>
	<div
		class="fixed inset-0 z-50 flex items-start justify-center sm:items-center"
	>
		<slot />
	</div>
</DialogPrimitive.Portal>
