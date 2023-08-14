<script lang="ts">
	import { cn } from "@/utils";
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<div class={cn("space-y-2", className)} {...$$restProps}>
	<slot />
</div>
